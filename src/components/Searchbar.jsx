import MobilePattern from "../images/pattern-bg-mobile.png";
import DeskPattern from "../images/pattern-bg-desktop.png";
import ArrowIcon from "../images/icon-arrow.svg";

export const SearchBar = ({ userInput, fetchData }) => {
  return (
    <div className="text-center flex flex-col h-[280px] md:h-[320px] bg-no-repeat bg-cover bg-mobile-pattern md:bg-desk-pattern">
      <h1 className="text-2xl md:text-3xl lg:text-4xl pt-9 md:pt-10 pb-6 md:pb-10 font-medium text-white">
        IP Address Tracker
      </h1>
      <form
        className="flex mx-auto w-full max-w-[85%] md:max-w-[560px]"
        onSubmit={fetchData}
      >
        <input
          className="mx-auto py-3 md:py-4 pl-5 w-full rounded-tl-xl rounded-bl-xl"
          type="text"
          placeholder="Search for any IP address or domain"
          onChange={userInput}
        />
        <button
          type="submit"
          className="bg-black p-5 rounded-tr-xl rounded-br-xl"
        >
          <img src={ArrowIcon} alt="" />
        </button>
      </form>
    </div>
  );
};
