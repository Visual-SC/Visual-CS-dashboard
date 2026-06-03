import { Link } from "react-router-dom";
import { useGraphTopProducts } from "./useGraphTopProducts";
import { formatPrice } from "../../utils/formatPrice";

function TopProducts() {
  const { canvasRef, chartData, topProducts, isLoading, error } = useGraphTopProducts();

  return (
    <div className="bg-light-blue rounded-lg p-4">
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
                    className="w-6 h-3 self-center"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
                  />
                  <span className="text-dark-green text-p-14 font-semibold self-center truncate">{product.nombre}</span>
                  <span className="text-black font-antonio font-black self-center text-right text-p-18">{formatPrice(product.total)}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-center">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6667 4.66V7.33333C14.6667 7.46517 14.6276 7.59403 14.5543 7.70364C14.481 7.81325 14.3769 7.89867 14.2551 7.94912C14.1333 7.99957 13.9993 8.01277 13.87 7.98706C13.7407 7.96134 13.6219 7.89787 13.5287 7.80467L12.6667 6.94267L9.13803 10.4713C9.01301 10.5963 8.84347 10.6665 8.66669 10.6665C8.48992 10.6665 8.32038 10.5963 8.19536 10.4713L6.00003 8.276L2.47136 11.8047C2.34563 11.9261 2.17722 11.9933 2.00243 11.9918C1.82763 11.9903 1.66042 11.9202 1.53681 11.7965C1.41321 11.6729 1.3431 11.5057 1.34158 11.3309C1.34006 11.1561 1.40726 10.9877 1.52869 10.862L5.52869 6.862C5.65371 6.73702 5.82325 6.66681 6.00003 6.66681C6.1768 6.66681 6.34634 6.73702 6.47136 6.862L8.66669 9.05733L11.724 6L10.862 5.138C10.7688 5.04477 10.7054 4.92599 10.6796 4.79669C10.6539 4.66739 10.6671 4.53336 10.7176 4.41156C10.768 4.28976 10.8534 4.18565 10.9631 4.1124C11.0727 4.03914 11.2015 4.00003 11.3334 4H14L14.032 4.00067C14.2023 4.00819 14.3632 4.08092 14.4813 4.20378C14.5995 4.32663 14.6658 4.49022 14.6667 4.66067" fill="#03575E"/>
                  </svg>
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