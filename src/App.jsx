import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [productName, setProductName] = useState("");
  const [checked, setChecked] = useState({});
  const [removing, setRemoving] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const addProduct = () => {
    if (productName.trim() === "") return;
    dispatch({ type: "ADD_PRODUCT", payload: productName.trim() });
    setProductName("");
  };

  const removeProduct = (index) => {
    setRemoving(index);
    setTimeout(() => {
      dispatch({ type: "REMOVE_PRODUCT", payload: index });
      const newChecked = {};
      Object.keys(checked).forEach((k) => {
        const ki = parseInt(k);
        if (ki < index) newChecked[ki] = checked[ki];
        else if (ki > index) newChecked[ki - 1] = checked[ki];
      });
      setChecked(newChecked);
      setRemoving(null);
    }, 300);
  };

  const toggleCheck = (index) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_PRODUCTS" });
    setChecked({});
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addProduct();
  };

  const done = Object.values(checked).filter(Boolean).length;
  const total = products.length;
  const progress = total ? (done / total) * 100 : 0;

  return (
    <div className="min-h-screen flex justify-center items-start px-5 py-16 bg-bazar-bg">
      <div className="w-full max-w-lg border border-bazar-border rounded-sm overflow-hidden bg-bazar-card">
        {/* ── Header ── */}
        <div className="px-10 pt-12 pb-8 border-b border-bazar-border">
          <p className="font-mono-custom uppercase tracking-[0.3em] mb-3 text-bazar-muted text-xs">
            Xarid ro'yxati
          </p>
          <h1
            className="font-display font-light leading-none text-bazar-text text-6xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Bazar
            <br />
            Ro'yhati
          </h1>

          {/* Progress bar */}
          <div className="mt-6 h-px w-full bg-bazar-border">
            <div
              className="h-full progress-fill bg-bazar-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-mono-custom text-bazar-muted text-xs tracking-[0.15em]">
            {done} / {total} bajarildi
          </p>
        </div>

        {/* ── Input ── */}
        <div className="px-10 py-7 flex gap-4 items-end border-b border-bazar-border">
          <input
            type="text"
            placeholder="Mahsulot qo'shing..."
            className="flex-1 bg-transparent border-0 border-b border-bazar-placeholder pb-3 outline-none font-mono-custom text-bazar-text focus:border-bazar-ink text-sm tracking-wide"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={addProduct}
            className="flex items-center justify-center rounded-full flex-shrink-0 cursor-pointer bg-bazar-text text-bazar-card hover:bg-bazar-dark transition-colors text-2xl"
            style={{
              width: "48px",
              height: "48px",
              border: "none",
              lineHeight: 1,
            }}
          >
            ＋
          </button>
        </div>

        {/* ── List ── */}
        {total === 0 ? (
          <div className="py-16 text-center font-mono-custom uppercase tracking-widest text-bazar-placeholder text-xs">
            Ro'yhat bo'sh
          </div>
        ) : (
          <ul className="overflow-y-auto" style={{ maxHeight: "520px" }}>
            {products.map((product, index) => (
              <li
                key={index}
                className={`list-item flex items-center gap-4 px-10 py-5 border-b border-bazar-border-light item-enter${removing === index ? " removing" : ""}`}
              >
                {/* Number */}
                <span className="font-mono-custom flex-shrink-0 text-right text-bazar-placeholder text-xs w-6 tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Checkbox */}
                <button
                  onClick={() => toggleCheck(index)}
                  className="check-btn flex-shrink-0 flex items-center justify-center rounded-full border cursor-pointer transition-all"
                  style={{
                    width: "22px",
                    height: "22px",
                    background: checked[index]
                      ? "var(--color-bazar-accent)"
                      : "transparent",
                    borderColor: checked[index]
                      ? "var(--color-bazar-accent)"
                      : "var(--color-bazar-placeholder)",
                  }}
                >
                  {checked[index] && (
                    <span
                      className="rounded-full bg-bazar-card block"
                      style={{ width: "8px", height: "8px" }}
                    />
                  )}
                </button>

                {/* Product name */}
                <span
                  className="flex-1 font-mono-custom text-sm tracking-wide transition-colors"
                  style={{
                    color: checked[index]
                      ? "var(--color-bazar-placeholder)"
                      : "var(--color-bazar-text)",
                    textDecoration: checked[index] ? "line-through" : "none",
                    textDecorationColor: "var(--color-bazar-accent)",
                  }}
                >
                  {product}
                </span>

                {/* Delete */}
                <button
                  className="del-btn cursor-pointer font-mono-custom text-bazar-placeholder hover:text-bazar-ink text-xl"
                  style={{ background: "none", border: "none", lineHeight: 1 }}
                  onClick={() => removeProduct(index)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* ── Footer ── */}
        {total > 0 && (
          <div className="px-10 py-5 flex justify-between items-center border-t border-bazar-border">
            <span className="font-mono-custom text-bazar-muted text-xs tracking-widest">
              {total} ta mahsulot
            </span>
            <button
              onClick={clearAll}
              className="font-mono-custom uppercase cursor-pointer text-bazar-placeholder hover:text-bazar-ink transition-colors text-xs tracking-widest"
              style={{ background: "none", border: "none" }}
            >
              Hammasini o'chirish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
