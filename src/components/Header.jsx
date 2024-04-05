import { useEffect, useState } from "react";
import Axios from "axios";
import { SearchBar } from "./Searchbar";
import { Map } from "./Map";

function DataDisplay({ title, value, border }) {
  return (
    <div
      className={`${
        border && `md:border-r-[1px]`
      } flex flex-col justify-start w-full md:border-gray-300 md:pr-10 md:pl-5 md:py-2`}
    >
      <p className=" uppercase text-[10px] md:text-xs mb-2 tracking-widest text-gray-400 font-bold">
        {title}
      </p>
      <h1 className=" font-semibold text-xl">{value}</h1>
    </div>
  );
}

export default function Header() {
  const [inputData, setInputData] = useState("");
  const [getLat, setLat] = useState(0);
  const [getLon, setLon] = useState(0);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [inError, setInError] = useState("");

  /*First Load*/
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await Axios.get(`http://ip-api.com/json/`);
        setLat(response.data.lat);
        setLon(response.data.lon);
        setIp(response.data.query);
        setLocation(response.data.regionName);
        setTimezone(response.data.timezone);
        setIsp(response.data.isp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserLocation();
  }, []);

  const userInput = (event) => {
    setInputData(event.target.value);
  };

  const fetchData = async (event) => {
    event.preventDefault();

    if (inputData) {
      try {
        const response = await Axios.get(`http://ip-api.com/json/${inputData}`);

        if (response.data.status === "fail") {
          // setInError("This is an invalid address. Try again.");
          alert("Incorrect IP address format. Try again.");
        } else {
          setLat(response.data.lat);
          setLon(response.data.lon);
          setIp(response.data.query);
          setLocation(response.data.regionName);
          setTimezone(response.data.timezone);
          setIsp(response.data.isp);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      // setInError("This is an invalid address");
      alert("This is not a valid IP address. Try again.");
    }
  };

  return (
    <div className="relative">
      <div className="relative z-[2]">
        <SearchBar userInput={userInput} fetchData={fetchData} />
      </div>{" "}
      {inError && <p className=" text-red-600 ">{inError}</p>}
      <div className="flex flex-col md:flex-row md:items-center md:h-fit md:px-2 gap-5 md:gap-0 w-full max-w-[85%] md:max-w-max mx-auto bottom-32 md:bottom-16 rounded-xl py-5 md:py-3 text-center md:text-start bg-white relative z-[2] ca">
        <DataDisplay border="2" title="ip address" value={ip} />
        <DataDisplay border="2" title="location" value={location} />
        <DataDisplay border="2" title="timezone" value={timezone} />
        <DataDisplay border="" title="isp" value={isp} />
      </div>
      <div className=" absolute top-[120px] md:top-[220px] w-full z-[1]">
        <Map getLat={getLat} getLon={getLon} />
      </div>
    </div>
  );
}
