import { createDefaultContext } from '../shared/context'
import { renderToString, SSRContext } from '@vue/server-renderer'
//import { getStyles } from './cdn.config'
import { getMeta } from './meta.config'
import { RouteLocationNormalized } from 'vue-router'
import { createFaviconLink } from '../favicon/favicon'
import { NextFunction, Request, Response } from 'express'
import { Stats, Compiler } from 'webpack'
import { JSDOM } from 'jsdom'
import { join, resolve } from 'path'
import type * as App from '../shared/app'
import { readJson, readFile } from 'fs-extra'

interface devMiddleware {
    stats: Stats,
    outputFileSystem: Compiler['outputFileSystem']
};

const chunks: Record<string, string> = {
    "/": "home",
    "/vertreter": "home",
    "/keinePanik": "home",
    "/externe": "home",
    "/impressum": "home",
    "/sprechstunden": "home",
    "/kontakt": "home",
    "/erstis": "home",
    "/wahl": "home"
}

let initialHtml: string | undefined;
let initialManifest: Record<string, string> | undefined;

async function loadDom(dev?: devMiddleware) {

    if (dev) {
        const outputFileSystem = dev!.outputFileSystem;
        const jsonWebpackStats = dev!.stats.toJson();
        const { assetsByChunkName, outputPath } = jsonWebpackStats || {};

        initialHtml = await new Promise<string>((resolve, reject) => {
            outputFileSystem!.readFile(join(outputPath!, 'test.html'), (error, result) => {
                if (error)
                    reject(error);
                resolve(result! as string);
            })
        });
    }
    else if (typeof initialHtml === "undefined")
        initialHtml = (await readFile('./dist-ssr/dist/test.html', { encoding: 'utf-8' }));
    return initialHtml;
}

async function loadManifest(dev?: devMiddleware) {

    if (dev) {
        const outputFileSystem = dev!.outputFileSystem;
        const jsonWebpackStats = dev!.stats.toJson();
        const { assetsByChunkName, outputPath } = jsonWebpackStats || {};

        initialManifest = await new Promise<Record<string, string>>((resolve, reject) => {
            outputFileSystem!.readFile(join(outputPath!, 'manifest.json'), (error, result) => {
                if (error)
                    reject(error);
                resolve(JSON.parse(result! as string));
            })
        })
    }
    else if (typeof initialManifest === "undefined")
        initialManifest = await readJson(resolve(__dirname, "..", "..", "dist-ssr", 'dist', 'manifest.json'), { encoding: 'utf-8' })
    return (initialManifest!);
}

function swap<A extends keyof any, B extends keyof any>(json: Record<A, B>) {
    var ret: Record<B, A> = new Object as Record<B, A>;
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}

const supportedLanguages =
    ['de',
        'en']

function getLanguage(req: Request) {

    const lang = req.acceptsLanguages(supportedLanguages)
    return <'en' | 'de'>(lang ? lang : 'en');
}

function loadFavicon(route: RouteLocationNormalized, context: SSRContext) {
    const favicon = (route.meta.favicon) ? route.meta.favicon : context.state.defaultFavicon;

    return createFaviconLink(favicon);
}

function loadDevMiddleWare(res: Response) {

    const devMiddleware = res.locals?.webpack?.devMiddleware;

    return (!!devMiddleware) ? <devMiddleware>devMiddleware : undefined;
}

function loadTitle(route: RouteLocationNormalized, context: SSRContext) {
    return (route.meta.title) ? route.meta.title : context.state.defaultTitle;
}

export default function ssr(dev: boolean) {

    return async function (req: Request, res: Response, next: NextFunction) {

        if (!req.accepts('html') || req.method !== 'GET')
            return next();

        try {
            const devMiddleware = loadDevMiddleWare(res);
            if (dev) delete require.cache[require.resolve('@distServer/main')];

            const domLoad = loadDom(devMiddleware);
            const manifestLoad = loadManifest(devMiddleware);
            const contextLoad = createDefaultContext();

            res.contentType('html');
            res.charset = 'utf-8';

            const language = getLanguage(req);

            const { createDefaultApp } = <typeof App>require('@distServer/main');
            const { router, store, app, i18n } = createDefaultApp({ language: language});

            router.push(req.url);
            await router.isReady();

            const currentRoute = router.currentRoute.value;
            if (!currentRoute.matched.length) return res.status(404).end();

            const context: SSRContext = { ...(await contextLoad) };
            const manifest = await manifestLoad;
            const dom = new JSDOM(await domLoad);

            context.state = store.state;

            const doc = dom.window.document;
            const head = doc.head;
            doc.children[0].setAttribute('lang', language);
            //doc.lang
            head.innerHTML += `<title>${i18n.global.t(loadTitle(currentRoute, context))}</title>`;
            //head.innerHTML += `<link href="https://cdnjs.cloudflare.com" rel="preconnect" crossorigin>`

            const chunk = chunks[req.url];
            if (chunk) {
                const preloadCss = manifest[chunk + '.css'];
                const nodeCss = doc.createElement('link');
                nodeCss.setAttribute('href', preloadCss);
                nodeCss.setAttribute('rel', 'stylesheet');
                head.appendChild(nodeCss);

                const preloadJs = manifest[chunk + '.js'];
                const nodeJs = doc.createElement('script');
                nodeJs.setAttribute('src', preloadJs);
                nodeJs.setAttribute('type', 'text/javascript')
                head.appendChild(nodeJs);
            }

            if (req.url === "/") {

                const preloadImg = manifest['plakat.jpg'];
                const nodeImg = doc.createElement("link");
                nodeImg.setAttribute('href', preloadImg);
                nodeImg.setAttribute('rel', 'preload');
                nodeImg.setAttribute('as', 'image');
                head.appendChild(nodeImg);
            }

            head.innerHTML += getMeta();
            //head.innerHTML += getStyles();
            head.innerHTML += loadFavicon(currentRoute, context);
            head.innerHTML += `<script>window.__INITIAL_STATE__=${JSON.stringify(context.state)}</script>`
            doc.getElementById('app')!.innerHTML = await renderToString(app, context);

            const document = dom.serialize();
            res.send(document).end();

        } catch (error) {
            console.log(error);
            return res.status(500).end("Internal Server Error");
        }
    };
}