import { Link } from "react-router-dom";
import { useGraphTopProducts } from "./useGraphTopProducts";
import { formatPrice } from "../../utils/formatPrice";

function TopProducts() {
  const { canvasRef, chartData, topProducts, isLoading, error } = useGraphTopProducts();

  return (
    <div className="bg-light-blue rounded-lg p-4 max-tablet-large:w-3/5 max-tablet-large:justify-self-center
    max-cellphone:w-full max-cellphone:p-0">
      <header className="flex justify-between">
        <section className="inline-flex w-auto">
          <h3 className="text-p-16 text-dark-green font-semibold">Productos top</h3>
          <img className="ml-4 w-6 h-6" src="./hugeicons_coffee-beans.svg" alt="Productos top Rodson Coffee" />
        </section>
        <Link to={"/productos"} className="inline-flex w-auto items-center">
          <p className="text-p-16 font-semibold text-dark-green">Ver productos</p>
          <img src="./akar-icons_link-out-green.svg" className="w-4 h-6 ml-4" alt="Ver productos Rodson Coffee" />
        </Link>
      </header>
      <p className="text-p-16 text-dark-green">5 productos más vendidos en el mes</p>
      <section className="mt-4 flex gap-4">
        {isLoading ? (
          <p className="text-center text-dark-green py-8">Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-8">Error: {error}</p>
        ) : chartData.labels.length === 0 ? (
          <p className="text-center text-dark-green py-8">Sin datos disponibles</p>
        ) : (
          <>
            <div className="w-39 h-39 shrink-0">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="flex-1 min-h-39 grid grid-cols-[20px_1fr_60px_16px] gap-2 content-center">
              {topProducts.map((product, i) => (
                <div key={product.nombre} className="contents">
                  <div
                    className="w-6 h-6 self-center"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
                  />
                  <span className="text-dark-green text-p-14 font-semibold self-center truncate h-6 flex items-center">{product.nombre}</span>
                  <span className="text-black font-antonio font-black self-center text-right text-p-18 h-6 flex items-center justify-end">{formatPrice(product.total)}</span>
                  <img src="./iconamoon_trend-up-fill.svg" className="w-4 h-6 self-center" alt="Ver producto" />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default TopProducts;