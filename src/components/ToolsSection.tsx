import { toolCategories } from '../data/tools';
import { ToolIcon } from './icons/BrandIcons';
import './ToolsSection.css';

export function ToolsSection() {
  return (
    <section className="tools panel" aria-labelledby="tools-heading">
      <div className="tools__head">
        <div>
          <span className="eyebrow">DAILY DRIVERS</span>
          <h2 id="tools-heading" className="tools__title">
            Tools I Work With
          </h2>
        </div>
      </div>

      <div className="tools__groups">
        {toolCategories.map((cat) => (
          <div key={cat.label} className="tools__group card">
            <h3 className="tools__cat">{cat.label}</h3>
            <ul className="tools__list" aria-label={cat.label}>
              {cat.tools.map((tool) => (
                <li key={tool.name} className="tools__chip">
                  <span className="tools__icon" aria-hidden="true">
                    <ToolIcon icon={tool.icon} />
                  </span>
                  <span className="tools__name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
