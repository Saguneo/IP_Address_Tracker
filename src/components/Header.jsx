import { useEffect, useState } from "react";
import Axios from "axios";
import { SearchBar } from "./Searchbar";
import { Map } from "./Map";

function DataDisplay({ title, value, border }) {
  return (
    <div
      className={`${
        border && `md:border-r-[1px]`
      } text-center md:text-start w-full px-3 mb-4 md:pl-6 md:pr-6`}
    >
      <p className=" uppercase text-[10px] md:text-xs mb-0.5 md:mb-1.5 tracking-widest text-gray-400 font-bold">
        {title}
      </p>
      <h1 className=" font-semibold text-lg md:text-lg">{value}</h1>
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
  const [timezone, setTimezone] = useState("");
  const [offset, setOffSet] = useState("");
  const [isp, setIsp] = useState("");
  const [inError, setInError] = useState("");

  /*First Load*/
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await Axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=865742e3c3b54c009e3dbcaf0808dd60`
        );
        setLat(response.data.latitude);
        setLon(response.data.longitude);
        setIp(response.data.ip);
        setCity(response.data.city);
        setLocation(response.data.state_prov);
        setTimezone(response.data.time_zone.name);
        setOffSet(response.data.time_zone.offset);
        setIsp(response.data.isp);
      } catch (error) {
        alert("Please disable your adblocker for the website to work!");
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
        const response = await Axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=865742e3c3b54c009e3dbcaf0808dd60&ip=${inputData}`
        );

        if (response.data.status === "fail") {
          // setInError("This is an invalid address. Try again.");
          alert("Incorrect IP address format. Try again.");
        } else {
          setLat(response.data.latitude);
          setLon(response.data.longitude);
          setIp(response.data.ip);
          setCity(response.data.city);
          setLocation(response.data.state_prov);
          setTimezone(response.data.time_zone.name);
          setOffSet(response.data.time_zone.offset);
          setIsp(response.data.isp);
        }
      } catch (error) {
        alert("Please disable your adblocker for the website to work!");
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
      <div className="w-[90%] max-w-[1100px] mx-auto pt-5 pb-1 md:pt-8 md:pb-4 flex flex-col md:flex-row bottom-32 md:bottom-16 rounded-xl bg-white relative z-[2] shadow-lg">
        <DataDisplay border="2" title="ip address" value={ip} />
        <DataDisplay
          border="2"
          title="location"
          value={city + ", " + location}
        />
        <DataDisplay border="2" title="timezone" value={timezone} />
        <DataDisplay border="" title="isp" value={isp} />
      </div>
      <div className=" absolute top-[150px] w-full z-[1]">
        <Map getLat={getLat} getLon={getLon} />
      </div>
    </div>
  );
}
