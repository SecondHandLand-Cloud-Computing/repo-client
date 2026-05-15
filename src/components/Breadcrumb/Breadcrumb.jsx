import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
// import { Chevron} from "lucide-react";
export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || index} className="flex items-center gap-2">
              <a
                href={item.href}
                className={`font-['Roboto'] text-base hover:underline ${
                  item.active || isLast
                    ? "text-black font-normal pointer-events-none"
                    : "text-[#4E4E4E] font-light"
                }`}
                aria-current={item.active || isLast ? "page" : undefined}
              >
                {item.label}
              </a>

              {!isLast && (<div className="flex items-center gap-0" aria-hidden   ="true">
                {/*<ChevronRight*/}
                {/*  className="w-4 h-6 text-[#4E4E4E] opacity-75 ml-0"*/}
                {/*  aria-hidden="true"*/}
                {/*/>*/}
                {/*<ChevronRight*/}
                {/*className="w-4 h-6 text-[#4E4E4E] opacity-75 mr-0"*/}
                {/*aria-hidden="true"*/}
                {/*/>*/}
                  {">>"}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ),
};