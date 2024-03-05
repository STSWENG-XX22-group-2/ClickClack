import Image from "next/image";

export default function Home() {
  return (
    <div className="text-2xl">Page.tsx</div>
  );
}
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(Home()).toBe(0)
  })
}