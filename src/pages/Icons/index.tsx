import { useMemo, useState, type ReactElement } from "react";
import * as Icons from "../../icons";
import type { IconProps } from "../../utils/interfaces";
import "./styles.scss";

interface IconComponent {
  (props: IconProps): ReactElement;
}

function IconsPage() {
  const [size, setSize] = useState(32);
  const [color, setColor] = useState("#ffffff");

  const iconEntries = useMemo(
    () =>
      Object.entries(Icons)
        .filter(([name]) => !name.includes("SCSSIcon"))
        .sort(([a], [b]) => a.localeCompare(b)) as [string, IconComponent][],
    [],
  );

  return (
    <div className="icons_page">
      <header className="icons_page_header">
        <h1>Icons Playground</h1>
        <a href="/">Back to Home</a>
      </header>

      <div className="icons_page_controls">
        <label>
          Size: {size}px
          <input type="range" min={12} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <label>
          Color
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
      </div>

      <section className="icons_page_grid">
        {iconEntries.map(([name, Icon]) => (
          <article key={name} className="icons_page_card">
            <div className="icons_page_preview">
              <Icon className="icons_page_icon" width={size} height={size} />
            </div>
            <p>{name}</p>
          </article>
        ))}
      </section>

      <style>{`.icons_page_icon { color: ${color}; }`}</style>
    </div>
  );
}

export default IconsPage;
