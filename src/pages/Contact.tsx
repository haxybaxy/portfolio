import { useSyncExternalStore } from "react";
import CopiedToast from "../components/CopiedToast";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";
import { EMAIL } from "../contact";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { LINK, SECTION_TITLE } from "../surface";

const neverChanges = () => () => {};

/** The address written out with [at], copied to the clipboard on click */
function CopyEmailText() {
  const { copied, copy } = useCopyEmail();
  // Null on the server and while hydrating, so the prerendered page never carries the address
  const address = useSyncExternalStore(
    neverChanges,
    () => EMAIL.replace("@", "[at]"),
    () => null,
  );

  return (
    <>
      <CopiedToast visible={copied} />
      <button
        type="button"
        onClick={copy}
        title={copied ? "Copied!" : "Copy email"}
        className={`cursor-pointer self-start text-lg font-bold md:text-xl ${LINK}`}
      >
        {address ?? "Copy email address"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </>
  );
}

function Contact() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      <Reveal>
        <h2 className={SECTION_TITLE}>Contact</h2>
      </Reveal>

      <div className="flex flex-col gap-5">
        {/* The copy button stays outside the reveal: it renders a fixed toast, which a transformed ancestor would trap */}
        <Reveal className="flex flex-col gap-5">
          <p className="text-2xl font-bold tracking-tight md:text-3xl">
            Want to work together?
          </p>
          <p className="leading-relaxed opacity-80">
            If you need someone who can make things happen at any given moment,
            <br />
            send me an email at my business address.
          </p>
        </Reveal>
        <CopyEmailText />
        <Reveal className="flex items-center gap-5">
          <span className="opacity-80">or stalk me on</span>
          <SocialLinks email={false} className="gap-5" />
        </Reveal>
      </div>
    </div>
  );
}

export default Contact;
