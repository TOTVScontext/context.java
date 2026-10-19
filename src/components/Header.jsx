import logo from '../assets/svg/logo-context.svg'

export default function Header() {
  return (
    <header className="shell">
      <a className="shell__brand" href="/">
        <img src={logo} />
      </a>
      <nav aria-label="Principal">
        <a className="shell__link is-active" href="/" aria-current="page">Notícias</a>
        <a className="shell__link" href="https://totvs-context.vercel.app/" target='_blank' aria-current="page">Context</a>
        <a className="shell__link" href="https://totvs-context.vercel.app/cli" target='_blank' aria-current="page">Context CLI</a>
      </nav>
    </header>
  );
}
