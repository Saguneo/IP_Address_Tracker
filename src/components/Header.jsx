import { useEffect, useState } from "react";
import Axios from "axios";
import { SearchBar } from "./Searchbar";
import { Map } from "./Map";

function DataDisplay({ title, value, border }) {
  return (
    <div
      className={`${
        border && `md:border-r-[1px]`
      } text-center border-gray-300 md:text-start w-full md:h-[100px] px-10 md:px-8 lg:pr-20 mb-auto`}
    >
      <p className=" uppercase text-[10px] mb-1 md:mb-2.5 md:text-xs tracking-widest text-gray-400 font-bold">
        {title}
      </p>
      <h1 className=" font-medium text-lg md:text-xl lg:text-2xl line-clamp-2">
        {value}
      </h1>
    </div>
  );
}

export default function Header() {
  const [inputData, setInputData] = useState("");
  const [getLat, setLat] = useState(0);
  const [getLon, setLon] = useState(0);
  const [ip, setIp] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [postal, setPostal] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [inError, setInError] = useState("");

  /*First Load*/
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await Axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_inKBkBC5GxQ1PALb6DTOCham3cvd0`
        );
        setLat(response.data.location.lat);
        setLon(response.data.location.lng);
        setIp(response.data.ip);
        setCity(response.data.location.city);
        setLocation(response.data.location.region);
        setPostal(response.data.location.postalCode);
        setTimezone(response.data.location.timezone);
        setIsp(response.data.isp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserLocation();
  }, []);

  console.log(postal);

  const userInput = (event) => {
    setInputData(event.target.value);
  };

  const fetchData = async (event) => {
    event.preventDefault();

    if (inputData) {
      try {
        const response = await Axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_inKBkBC5GxQ1PALb6DTOCham3cvd0&ipAddress=${inputData}`
        );

        if (response.data.status === "fail") {
          // setInError("This is an invalid address. Try again.");
          alert("Incorrect IP address format. Try again.");
        } else {
          setLat(response.data.location.lat);
          setLon(response.data.location.lng);
          setIp(response.data.ip);
          setCity(response.data.location.city);
          setLocation(response.data.location.region);
          setPostal(response.data.location.postalCode);
          setTimezone(response.data.location.timezone);
          setIsp(response.data.isp);
        }
      } catch (error) {
        alert("Please disable your Ad Blocker to allow this feature!");
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
      {/* {inError && <p className=" text-red-600 ">{inError}</p>} */}
      <div className=" space-y-4 md:space-y-0 w-[85%] max-w-[1100px] mx-auto py-6 md:py-10 flex flex-col md:flex-row bottom-28 md:bottom-24 rounded-2xl bg-white relative z-[2] shadow-lg">
        <DataDisplay border="2" title="ip address" value={ip} />
        <DataDisplay
          border="2"
          title="location"
          value={city + ", " + location}
        />
        <DataDisplay
          border="2"
          title="timezone"
          value={"UTC" + " " + timezone}
        />
        <DataDisplay border="" title="isp" value={isp} />
      </div>
      <div className=" absolute top-[145px] w-full z-[1]">
        <Map getLat={getLat} getLon={getLon} />
      </div>
    </div>
  );
}
