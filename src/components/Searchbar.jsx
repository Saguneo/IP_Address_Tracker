import MobilePattern from "../images/pattern-bg-mobile.png";
import DeskPattern from "../images/pattern-bg-desktop.png";
import ArrowIcon from "../images/icon-arrow.svg";

export const SearchBar = ({ userInput, fetchData }) => {
  return (
    <div className="text-center flex flex-col h-[270px] md:h-[220px] bg-no-repeat bg-cover bg-mobile-pattern md:bg-desk-pattern">
      <h1 className="text-2xl pt-5 pb-5 font-medium text-white">
        IP Address Tracker
      </h1>
      <form
        className="flex mx-auto w-full max-w-[90%] md:max-w-[550px]"
        onSubmit={fetchData}
      >
        <input
          className="mx-auto py-3 pl-4 w-full rounded-tl-xl rounded-bl-xl"
          type="text"
          placeholder="Search for any IP address"
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
