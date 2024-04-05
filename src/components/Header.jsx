import { useEffect, useState } from "react";
import Axios from "axios";
import { SearchBar } from "./Searchbar";
import { Map } from "./Map";

function DataDisplay({ title, value }) {
  return (
    <div>
      <p className=" uppercase text-[10px] tracking-widest text-gray-400 font-bold">
        {title}
      </p>
      <h1 className=" font-semibold text-lg">{value}</h1>
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
          setInError("This is an invalid address. Try again.");
          console.error("This is invalid!");
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
      setInError("This is an invalid address");
      console.log("Enter a valid IP!");
    }
  };

  return (
    <div className="relative">
      <div className="relative z-[2]">
        <SearchBar userInput={userInput} fetchData={fetchData} />
      </div>{" "}
      {inError && <p className=" text-red-600 ">{inError}</p>}
      <div className="flex flex-col gap-5 w-full max-w-[85%] mx-auto bottom-32 rounded-xl py-5 text-center bg-white relative z-[2] ca">
        <DataDisplay title="ip address" value={ip} />
        <DataDisplay title="location" value={location} />
        <DataDisplay title="timezone" value={timezone} />
        <DataDisplay title="isp" value={isp} />
      </div>
      <div className=" absolute top-[120px] w-full z-[1]">
        <Map getLat={getLat} getLon={getLon} />
      </div>
    </div>
  );
}
