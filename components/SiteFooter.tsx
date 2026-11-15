import Arrow from "@/components/Arrow";
import { SITE } from "@/lib/site";

export default function SiteFooter({ home = "" }: { home?: "" | "/" }) {
  return (
    <footer className="footer closing footer--statement" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">Email Alex about a software role</h2>
            <p>Open to backend, full-stack and applied AI roles, at startups and large companies alike.</p>
          </div>
          <a className="btn btn--primary btn--xl btn--wide" href={`mailto:${SITE.email}`}>
            Email Alex
            <Arrow />
          </a>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="nav__logo" href={home || "#top"}>
                <span className="mark" data-mark="arc" aria-hidden="true" />
                {SITE.name}
              </a>
              <p className="footer__lede">Software engineer in {SITE.location}.</p>
            </div>
            <div className="span-2 footer__col">
              <h3>Work</h3>
              <ul>
                <li><a href="/work/pylot">Pylot case study</a></li>
                <li><a href={`${home}#aurajewel`}>AuraJewel</a></li>
                <li><a href={`${home}#work`}>More products</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>About</h3>
              <ul>
                <li><a href={`${home}#about`}>Background</a></li>
                <li><a href={SITE.resume}>Résumé</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Elsewhere</h3>
              <ul>
                <li><a href={SITE.github}>GitHub</a></li>
                <li><a href={SITE.linkedin}>LinkedIn</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Contact</h3>
              <ul>
                <li><a href={`mailto:${SITE.email}`}>Email</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>&copy; {new Date().getFullYear()} {SITE.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
