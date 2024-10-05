export default function Header() {
  return (
    <div>
      <header className="w-full flex justify-between border-b-2 px-8 py-2 border-cyan-200">
        <div className="text-2xl font-bold">Reown Connect</div>
        <w3m-button label="Connect" balance="show" />
      </header>
    </div>
  );
}
