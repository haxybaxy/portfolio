import Peek, { type Card } from "../components/Peek";
import Reveal from "../components/Reveal";
import { DOTFILES_URL } from "../contact";
import {
  blogPosts,
  formatPostDate,
  postHref,
  WRITING_HREF,
} from "../data/blog";
import { LINK, MUTED, PANEL, SECTION_TITLE } from "../surface";

// Two columns of two photos; the crops are chosen so both columns end on the same line
const PHOTO_COLUMNS = [
  [
    {
      src: "/torre-de-hercules.webp",
      caption: "Torre de Hércules, A Coruña",
      aspect: "aspect-[3/4]",
    },
    {
      src: "/corne.webp",
      caption: "My custom DIY Corne keyboard",
      aspect: "aspect-[2/1]",
    },
  ],
  [
    {
      src: "/me.webp",
      caption: "Me Holding a Shawarma",
      aspect: "aspect-square",
    },
    {
      src: "/fatteh.webp",
      caption: "A beautiful plate of Fatteh (فتة مقدوس)",
      aspect: "aspect-[6/5]",
    },
  ],
];

// Spans both columns under the grid
const WIDE_PHOTO = {
  src: "/mountain.webp",
  caption: "Sunrise at Sierra de Guadarrama",
  aspect: "aspect-[8/3]",
};

const LATEST_POSTS = blogPosts.slice(0, 3);

// Hover cards for words in the text. Edit the captions here.
// ribeye.webp: "The Food at Davids Kitchen 061" by David Reber, CC BY-SA 2.0; zen.webp: "Ryoanji rock garden 857", CC BY-SA 3.0 (both Wikimedia Commons)
const CARDS = {
  amman: { image: "/amman.webp", caption: "Amman, Jordan." },
  ieTower: {
    image: "/ietower.webp",
    caption: "The IE Tower in Madrid.",
    tall: true,
  },
  skoll: {
    image: "/projectphotos/skoll.webp",
    caption: "Skoll, an AI go-to-market engineer. My last venture.",
  },
  ribeye: { image: "/ribeye.webp", caption: "mmm steak 🤤" },
  chickenLiver: {
    image: "/chicken-liver.webp",
    caption: "mmm chicken liver sandwich 🤤",
    tall: true,
  },
  overheadPress: {
    image: "/overhead-press.webp",
    caption: "my current favorite excercise",
  },
  zen: { image: "/zen.webp", caption: "The rock garden at Ryōan-ji, Kyoto." },
} satisfies Record<string, Card>;

function About() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-12">
      <Reveal>
        <h2 className={SECTION_TITLE}>About</h2>
      </Reveal>

      <Reveal
        delay={80}
        className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start md:gap-12"
      >
        <div className="flex flex-col gap-5 leading-relaxed">
          <p>
            I'm a software developer from{" "}
            <Peek card={CARDS.amman} className="font-bold">
              Amman, Jordan
            </Peek>
            . I studied Computer Science and AI at{" "}
            <Peek href="https://www.ie.edu/university/" card={CARDS.ieTower}>
              IE University
            </Peek>{" "}
            in Madrid, and I currently live there.
          </p>
          <p>
            I've founded a bunch of startups and scaled them from 0 to serving
            enterprise customers. My last venture was{" "}
            <Peek href="https://useskoll.com" card={CARDS.skoll}>
              Skoll
            </Peek>
            , where I built an AI native platform for GTM. After parting ways
            with that, I've been building GTM automations for companies under my
            own practice.
          </p>
          <p>
            On a more personal note, I'm really into{" "}
            <Peek card={CARDS.ribeye} className="italic">
              ribeye steaks
            </Peek>
            ,{" "}
            <Peek card={CARDS.chickenLiver} className="italic">
              chicken liver sandwiches
            </Peek>
            , computers, productivity workflows,{" "}
            <Peek card={CARDS.overheadPress}>overhead pressing</Peek>, and{" "}
            <Peek card={CARDS.zen}>mindfulness</Peek>.
          </p>
          <div className="flex flex-col gap-2">
            <p>
              If you want to learn more about me, you can check out my{" "}
              <a
                href={DOTFILES_URL}
                target="_blank"
                rel="noreferrer"
                className={LINK}
              >
                dotfiles
              </a>{" "}
              (if you're that type of person), or read my{" "}
              <a href={WRITING_HREF} className={LINK}>
                blog
              </a>
              .
            </p>
            {LATEST_POSTS.length > 0 && (
              <ul className="flex list-['→_'] flex-col gap-1 pl-6">
                {LATEST_POSTS.map((post) => (
                  <li key={post.slug}>
                    <a href={postHref(post.slug)} className={LINK}>
                      {post.title}
                    </a>
                    <time dateTime={post.date} className={`${MUTED} block`}>
                      {formatPostDate(post.date)}
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Photos lead on wider screens; on phones the text comes first */}
        <div className="flex flex-col gap-8 md:order-first">
          <div className="grid grid-cols-2 gap-3">
            {PHOTO_COLUMNS.map((column, c) => (
              <div key={c} className="flex flex-col gap-3">
                {column.map((photo) => (
                  <Photo key={photo.src} photo={photo} />
                ))}
              </div>
            ))}
            <div className="col-span-2">
              <Photo photo={WIDE_PHOTO} />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default About;

type PhotoItem = { src: string; caption: string; aspect: string };

function Photo({ photo }: { photo: PhotoItem }) {
  return (
    <figure className="flex flex-col gap-1.5">
      <img
        src={photo.src}
        alt={photo.caption}
        className={`${PANEL} w-full object-cover ${photo.aspect}`}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="text-xs leading-snug opacity-60">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
