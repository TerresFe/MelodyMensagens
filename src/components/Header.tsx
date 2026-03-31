export default function Header({ setTab }: any) {
  return (
    <header className="p-6 flex justify-between items-center border-b border-white/20 backdrop-blur-md bg-black/30 sticky top-0 z-50">
      <h1 className="text-3xl font-bold">Melody Mensagens</h1>
      <nav className="flex gap-6">
        <button onClick={() => setTab('home')}>Início</button>
        <button onClick={() => setTab('texts')}>Textos</button>
        <button onClick={() => setTab('packages')}>Pacotes</button>
      </nav>
    </header>
  )
}
