<template>
  <div id="erstis">
    <!--nav class="floating-menu">
      <h3>Floating Menu</h3>
      <a href="#uniBayreuth">Uni Bayreuth</a>
      <a href="#rolle">Rolle der Fachschaft</a>
      <a href="/coldfusion/">ColdFusion</a>
      <a href="/database/">Database</a>
    </nav-->
    <div class="tw-m-3.5">
      <div style="max-width: 1100px; margin: 0 auto">
        <i18n-t
          tag="h3"
          keypath="h[0]"
        />
        <i18n-t
          tag="p"
          keypath="p[0]"
        />
        <br />
        <section id="uniBayreuth">
          <i18n-t
            tag="h2"
            keypath="h[1]"
          />
          <i18n-t
            tag="p"
            keypath="p[1]"
          />
        </section>
        <br />
        <section id="rolle">
          <i18n-t
            tag="h2"
            keypath="h[2]"
          />
          <i18n-t
            tag="p"
            keypath="p[2]"
          />
        </section>
        <br />
        <i18n-t
          tag="h1"
          keypath="h[3]"
        />
        <i18n-t
          tag="p"
          keypath="p[3]"
        />
        <br />
        <i18n-t
          tag="h1"
          keypath="h[4]"
        />
        <i18n-t
          tag="p"
          keypath="p[4]"
        />
        <br />
        <i18n-t
          tag="h1"
          keypath="h[5]"
        />
        <i18n-t
          tag="p"
          keypath="p[5]"
        />
        <br />
        <i18n-t
          tag="h1"
          keypath="h[6]"
        />
        <i18n-t
          tag="p"
          keypath="p[6]"
        />
        <br />
  <!--     <i18n-t
          tag="h1"
          keypath="h[7]"
        />
        <i18n-t
          tag="p"
          keypath="p[7]"
        />
        

        <br />
        --> 
        <i18n-t
          tag="h2"
          keypath="dates"
        />
        <div>
          <table-comp
            :columns="categories"
            :rows="stunden"
            :data="sprechstunden"
            :breakpoint="550"
            :first-header-cell="{ value: 'Termin', show: 'SMALL' }"
          ></table-comp>
        </div>
        <br /><br />
        <i18n-t
          tag="p"
          keypath="p[n]"
        >
          <template #mail>
            fsmpi@uni-bayreuth.de
          </template>
        </i18n-t>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nGlobal } from '@shared/i18n.js'

import tableComp from './dynamicTable.vue'
import type { TableRow, Table } from './dynamicTable.vue'

export default defineComponent({
  components: {
    tableComp
  },
  setup()
  {
    const tGlobal = useI18nGlobal().t
    const tLocal = useI18n()
    const { t } = tLocal

    const categories = computed(() => [t('event'), t('location')])

    const stunden = computed(() => [
      `08.10 | ${t('ab')} 17:00`,
      '09.10 | 19:00',
      '16.10 | 19:00',
      '17.10 | 19:00',
      '21.10 | 19:00',
      '22.10 | 19:00',
      '23.10 | 19:00',
      '24.10 | 19:00',
      '30.10 | 17:00',
      '08.11 - 10.11'
    ])

    const sprechstunden = computed(() =>
    {
      let a: TableRow = {}
      let b: TableRow = {} //Wintersemestertermine
      a[0] = [t('Erstsemestergrillen')]
      a[1] = ['1. ' + t('Kneipentour')],
      a[2] = ['1. ' + t('buddy')],
      a[3] = ['2. ' + t('Kneipentour')],
      a[4] = [t('Sitzung')],
      a[5] = [t('Spieleabend')],
      a[6] = ['2. ' + t('buddy')],
      a[7] = [t('shake')],
      a[8] = [t('sdf')],
      a[9] = [t('Wochenende')],


      b[0] = [t('nw2Innen')],
      b[1] = [t("Anmeldung")],
      b[2] = ['H20 | NW2'],
      b[3] = [t("Anmeldung")],
      b[4] = ['H20 | NW2'],
      b[5] = ['H20 | NW2'],
      b[6] = ['H20 | NW2'],
      b[7] = [t("Anmeldung")],
      b[8] = ['tdb'],
      b[9] = [t('liste')]



      //Sommersemestertermine
/*      a[0] = ['1. ' + t('Kneipentour')]
      a[1] = [t('Spieleabend')],
      a[2] = [
        t('shake')
      ],


      b[0] = [t('Anmeldung')],
      b[1] = ['H20 | NW2'],
      b[2] = [t("Anmeldung")];
*/
      let z: Table = {}
      z[0] = a
      z[1] = b

      return z
    })

    return {
      t,
      tGlobal,
      categories,
      stunden,
      sprechstunden
    }
  }
})
</script>

<style lang="less">
#erstis {
  h3 {
    font-size: 2rem;
    color: var(--color-primary-header);
  }
  h2 {
    font-size: 1.5rem;
    color: var(--color-primary-header);
  }
  h1 {
    font-size: 1.2rem;
    color: var(--color-secondary-header);
  }
  .link {
    color: lightblue;
  }
  .link:hover {
    color: var(--color-primary);
  }
  ul {
    li {
      margin-left: 20px;
      color: #f1f1f1;
    }
  }
  p {
    text-align: justify;
    color: #f1f1f1;
  }
  .floating-menu {
    font-family: sans-serif;
    background: yellowgreen;
    padding: 5px;
    width: 200px;
    z-index: 100;
    position: fixed;
  }
  .floating-menu a,
  .floating-menu h3 {
    font-size: 0.9em;
    display: block;
    margin: 0 0.5em;
    color: white;
  }
}
</style>

<i18n locale="de" lang="json5">
{
  "h[0]": "Informationen für Studieninteressierte",
  "p[0]": "Du überlegst, ein Bachelor-, Master- oder Lehramtsstudium in Mathe, \
          Physik oder Informatik an der Uni Bayreuth anzufangen, fragst dich \
          aber noch, wie hier das Unileben so abläuft und ob Bayreuth die \
          richtige Stadt für dich ist? Auf dieser Seite erfährst du, warum!",
  "h[1]": "Das Besondere an der Uni Bayreuth",
  "p[1]": "Die Uni Bayreuth ist eine relativ kleine Uni und die Fakultät \
          Mathe/Physik/Informatik eine kleine Fakultät. Doch hier liegt auch \
          schon ein großer Vorteil: Man kennt sich. Anders als an anderen großen \
          Massenunis ist man hier von Anfang an nicht nur eine Matrikelnummer, \
          sondern hat gleich z.B. in kleinen Übungsgruppen von oft unter 15 \
          Leuten die Möglichkeit, Mitstudierende kennenzulernen und auch \
          persönlichen Kontakt zu den Übungsleitern herzustellen.",
  "h[2]": "Die Rolle der Fachschaft dabei",
  "p[2]": "Dank der Fachschaft ist es möglich, dass ein großer Austausch zwischen \
          den Studierenden stattfinden kann. So kann man auch als Erstsemester \
          schon ältere Studierende kennenlernen, die einem mit gutem Rat zur \
          Seite stehen. Wie geht das? Einerseits steht die Tür zur Fachschaft \
          natürlich für jeden immer offen, egal ob bei konkreten Fragen und \
          Problemen oder um einfach nur ein bisschen zu entspannen. Andererseits \
          organisiert die Fachschaft auch speziell für Erstsemester \
          Veranstaltungen zum Kennenlernen. Die Erstsemester-Veranstaltungen",
  "h[3]": "Buddy-System (und Spieleabende)",
  "p[3]": "Dies ist ein Hilfesystem für Erstsemestler, bei dem jeder Ersti \
          einen Studierenden aus einem höheren Semester (bestenfalls \
          gleiche Studienrichtung) zugeteilt bekommt. Dieser hilft gerne bei \
          organisatorischen Fragen des Studiums, da es gerade zum Anfang schon \
          mal ganz schön verwirrend werden kann. Außerdem werden ab und zu \
          Spieleabende oder Ähnliches angeboten, bei denen ihr nette Leute eurer \
          Fakultät kennenlernen könnt 😃",
  "h[4]": "Kneipentouren",
  "p[4]": "Zum Anfang des Semesters organisieren wir immer zwei Kneipentouren für \
          alle Erstsemester. In kleineren Gruppen besucht man hier an einem \
          Abend drei bis vier der Bayreuther Kneipen. Dabei kann man nicht nur \
          die Stadt und ihre Angebote besser kennenlernen, sondern auch die \
          anderen Erstsemester und die Fachschaft.",
  "h[5]": "Erstiwochenende",
  "p[5]": "Immer am Anfang des Wintersemesters fahren alle Fachschaftler mit \
          allen Erstis, die Lust haben, zusammen in eine Unterkunft in der Nähe \
          von Bayreuth, um dort das Wochenende zu verbringen. Damit dort auch \
          niemandem langweilig wird, gibt es natürlich immer ein umfangreiches \
          Programm, um alle auf Trab zu halten. Aber auch um einfach ein \
          bisschen auszuspannen und ein paar Leute aus seinem Semester und auch \
          die Fachschaftler besser kennenzulernen, ist das Erstiwochenende super \
          geeignet.",
  "h[6]": "Erstigrillen",
  "p[6]": "Natürlich kein Grillen der Erstis, sondern mit den Erstis 😉. Bei \
          Speis und Trank kann man hier mit anderen Studierenden ins Gespräch \
          kommen.",
  "h[7]": "Erstifrühstück",
  "p[7]": "Ein kleines, aber feines Frühstück in der Uni auf Kosten der \
          Fachschaft.",
  "dates": "Termine für das Wintersemester 24/25",
  "event": "Veranstaltung",
  "location": "Ort",
  "ab": "ab",
  "Erstsemestergrillen": "Erstsemestergrillen",
  "Kneipentour": "Kneipentour",
  "Einführung": "Einführung",
  "Vorstellung": "Vorstellung der Fachschaft",
  "Führung": "Campusführung",
  "Erstitüten": "Erstitüten",
  "Immatrikulationsstunde": "Immatrikulationsstunde",
  "Campusabend": "Campusabend",
  "Sitzung": "Erstisitzung",
  "Spieleabend": "Spieleabend",
  "buddy": "Buddytreffen",
  "Wochenende": "Ersti-Wochenende",
  "Anmeldung": "Anmeldung E-Learning",
  "grillplatz": "städtischer Grillplatz",
  "linkage": "Link im E-Learning",
  "corona": "Es gelten die jeweils aktuellen Corona Regelungen {br} \
            Die Anmeldung im E-Learning findet im Kurs der Fachschaft statt \
            {link}",
  "p[n]": "Ihr seht also, es gibt viele gute Gründe, nach Bayreuth zu kommen und \
          wir als Fachschaft geben unser Bestes, euch den Einstieg in euer \
          Studium so einfach wie möglich zu machen. Falls ihr noch offene Fragen \
          habt, schaut doch einfach mal in unserem Büro (NW II, zwischen H 20 \
          und S 78) vorbei, dann könnt ihr euch selbst ein Bild von der schönen \
          Campus-Uni Bayreuth und der dort angesiedelten Fachschaft machen. \
          Oder, falls ihr von weiter herkommt oder die Pandemie gerade keinen \
          persönlichen Kontakt zulässt, schreibt uns einfach eine Mail \
          ({mail}).",
  "fachschaft": "Fachschaft",
  "sdf": "Schlacht der Fakultäten",
  "frühstück": "Frühstück",
  "shake": "Shakekurs",
  "nw2Innen": "NW2-Innenhof",
  "liste": "Anmeldeliste vor Fachschaft"
}
</i18n>

<i18n locale="en" lang="json5">
{
  "h[0]": "Informations for prospective students",
  "p[0]": "You're thinking about starting a bachelor-, master- or lectureship study in math, \
          physics or computer science at the Uni Bayreuth or \
          you're still asking yourself what uni life runs and if Bayreuth is the right city for you? \
          On this page you're going to find out why!",
  "h[1]": "The special about the Uni Bayreuth",
  "p[1]": "The Uni Bayreuth is a relatively small uni and the faculty math/physics/computer science is a small faculty. \
          Yet here lies already a great advantage: People know each other. Unlike all the other mass unis you're from the beginning not just a \
          matriculation number but rather you're right from the beginning able to e.g. in small groups of often under 15 persons to get to know fellow students \
          and create personal contact to training supervisors.",
  "h[2]": "The role of the student council",
  "p[2]": "Thanks to the student council it's possible that there's a great exchange between students. \
          So freshman are able to get to know older students which are able to give good advice. \
          How does it work? For one thing is the door to the student council naturally open for everyone \
          no matter if it's about concrete questions and problems or just to relax a bit. For the other is the student council organizing events just for freshman to get to know each other. \
          The freshman-events",
  "h[3]": "Buddy-System (and game evenings)",
  "p[3]": "This is a support system for freshman whereby every freshman which wants to participate gets a student of a higher semester assigned (of the same field of study in the best case). \
          Your budy will gladly help you with your questions regarding the organization of your studies especially since it can be somewhat confusing in the beginning. \
          Furthermore there will be some games evenings or similar offered where your able to get to know nice people from your faculty 😃",
  "h[4]": "Pub crawls",
  "p[4]": "We're always organizing two pub crawls for all freshman at the beginning of the semester. \
          On one evening you'll be visiting three to four pubs of Bayreuth in small groups. \
          In doing so you're not only able to see the town and get to know its offers but also the other freshman and the student council.",
  "h[5]": "Freshers weekend",
  "p[5]": "Every beginning of the winter semester all the student council members \
          are driving with all the freshers which feel like it to a accommodation near Bayreuth to spend the weekend together. \
          In order that no one's getting bored there's naturally a extensive program to keep everyone on their toes. \
          But it's also super usefull to simply relax a bit and to get to know some people from your own semester and some members of the student council.",
  "h[6]": "Freshers grilling",
  "p[6]": "Naturally we're not grilling the freshers but rather with the freshers 😉. \
          Over foods and drinks you're able to get into conversations with other students.",
  "h[7]": "Freshers breakfast",
  "p[7]": "A small but fine breakfast in the uni at the expense of the student council.",
  "dates": "Dates for the winter semester 24/25",
  "event": "Event",
  "location": "Location",
  "ab": "from",
  "Erstsemestergrillen": "freshman grilling",
  "Kneipentour": "pub crawl",
  "Einführung": "Introduction",
  "Vorstellung": "Introduction of the student council",
  "Führung": "guided campus tour",
  "Erstitüten": "freshers bags",
  "Immatrikulationsstunde": "immatriculation hour",
  "Campusabend": "campus evening",
  "Sitzung": "freshers conference",
  "Spieleabend": "games evening",
  "buddy": "buddy meeting",
  "Wochenende": "freshers weekend",
  "Anmeldung": "application in E-Learning",
  "grillplatz": "municipal grilling place",
  "linkage": "link in E-Learning",
  "corona": "Corona regulations apply as amended {br} \
            The application in E-Learning takes place through the course of the student council \
            {link}",
  "p[n]": "As you can see there's a lot of sound reasons to go to Bayreuth and we \
          as the student council will do our best to make your entry to your studies as easy as possible. \
          If there are any open questions feel free to visit our office (NW II, between H 20 \
          and S 78) where you can paint yourself a picture of the beautifull campus uni Bayreuth and the here settled student council. \
          Or if you're coming from farther away or if theirs no possibility of direct contact due to the pandemic leave us a mail ({mail}).",
  "fachschaft": "Student council",
  "sdf": "Battle of the faculties",
  "frühstück": "Breakfast",
  "shake": "shake course",
  "nw2Innen": "NW2-inner courtyard",
  "liste": "registration in front of the fachschaft"
}
</i18n>
