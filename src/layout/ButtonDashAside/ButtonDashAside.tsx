import type { ButtonDashAsideProps } from './type';

const ButtonDashAside:React.FC<ButtonDashAsideProps> = ({ toggleDashCellphone }) => {
  return (
    <button
        onClick={toggleDashCellphone}
        className="w-11 h-11 inline-flex items-center justify-center
        bg-medium-blue rounded-full absolute top-2 left-4 z-30 cellphone:hidden"
        aria-label="Menu"
      >
        <img className="w-6 h-6" src="./right-arrow.svg" />
    </button>
  )
}

export default ButtonDashAside
