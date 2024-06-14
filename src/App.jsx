import React, { useState } from "react";
import cloud from "../src/assets/cloud.png";
import snow from "../src/assets/snow.png";
import clear from "../src/assets/clear.png";
import mist from "../src/assets/mist.png";
import rain from "../src/assets/rain.png";
import wind from "../src/assets/wind.png";
import thenderstrom from "../src/assets/thenderstrom.png";
import { IoSearch } from "react-icons/io5";
import cloudyDetails from "../src/assets/cloudyDetails.png";
import humadity from "../src/assets/humadity.png";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [weather, setweather] = useState("");
  const [weatherDetails, setweatherDetails] = useState({});
  const [weatherJosn, setweatherJosn] = useState({});
  const [weatherJosnMain, setweatherJosnMain] = useState({});
  const [error, seterror] = useState();

  const HandleINput = (event) => {
    setinputValue(event.target.value);
  };

  const HandleSearch = () => {
    const API = "3aff4cee98a4219ed9d0b838ca897fa2";

    if (inputValue == "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API}`
    )
      .then((response) => response.json())
      .then((josn) => {
        setweather(josn.weather[0].main);
        setweatherDetails(josn.weather[0]);
        setweatherJosn(josn);
        setweatherJosnMain(josn.main);
      })
      .catch((err) => {
        seterror(err);
      });
  };

  console.log(weatherJosn);

  return (
    <>
      <div
        className={`${
          weather
            ? weather == "Haze"
              ? "bg-[url('src/assets/hazeBg.jpg')]"
              : weather == "Clouds"
              ? "bg-[url('src/assets/cloudy.webp')]"
              : weather == "Clear"
              ? "bg-[url('src/assets/clearBg.jpg')]"
              : weather == "Rain"
              ? "bg-[url('src/assets/rainBg.jpg')]"
              : weather == "Wind"
              ? "bg-[url('src/assets/windBg.jpg')]"
              : weather == "Mist"
              ? "bg-[url('src/assets/hazeBg.jpg')]"
              : weather == "Snow"
              ? "bg-[url('src/assets/snowBg.jpg')] "
              : weather == "Thunderstorm"
              ? "bg-[url('src/assets/stromBg.jpg')]"
              : weather == "Drizzle"
              ? "bg-[url('src/assets/cloudy.webp')]"
              : "ClearBg"
            : "bg-[url('src/assets/weather.jpg')]"
        } w-full h-screen bg-cover bg-center`}
      >
        <div className="flex flex-col sm:flex-row basis-full">
          <div className="container pr-0 ">
            {/* left */}
            <div className="text-white font-Roboto flex items-end top-[30px] left-[27px] sm:h-[85%] z-[2] absolute sm:static sm:w-full basis-[50%]">
              <div className="flex flex-col  gap-x-2 md:gap-x-3">
                <div className="">
                  <h4 className="text-[30px] md:text-[40px] lg:text-[50px] w-[290px] sm:w-full font-normal pb-1 md:pb-2">
                    {weatherJosn.name ? weatherJosn.name : "London"}
                  </h4>
                  <p className="text-[12px] md:text-[18px] font-normal">
                    Feels like{" "}
                    <span className="pl-1">
                      {" "}
                      {Math.round(
                        weatherJosnMain && weatherJosnMain.feels_like
                          ? weatherJosnMain.feels_like
                          : "24"
                      )}
                    </span>
                    °
                  </p>
                </div>
                <div className="flex items-center">
                  <h3 className="text-[30px] md:text-[40px] lg:text-[70px] font-normal">
                    {Math.floor(
                      weatherJosnMain.temp ? weatherJosnMain.temp : "16"
                    )}
                    °
                  </h3>

                  <picture>
                    <img
                      src={
                        weather == "Clear"
                          ? clear
                          : weather == "Clouds"
                          ? cloud
                          : weather == "Rain"
                          ? rain
                          : weather == "Wind"
                          ? wind
                          : weather == "Snow"
                          ? snow
                          : weather == "Mist"
                          ? mist
                          : weather == "Haze"
                          ? mist
                          : weather == "Thunderstorm"
                          ? thenderstrom
                          : weather == "Drizzle"
                          ? cloud
                          : clear
                      }
                      alt=""
                      className="w-[50px] md:w-[60px] lg:w-[90px]"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
          {/* right */}

          <div className="bg-[#ffffff0a] absolute pt-[150px] z-[1] sm:static backdrop-blur-md h-screen w-full sm:basis-[94%] md:basis-[70%] lg:basis-[53%] md:pl-8 sm:pt-6 md:pt-12 overflow-x-hidden overflow-y-scroll">
            <div className="container md:pl-0">
              <div className="w-full relative border-b-[1.5px]">
                <input
                  type="text"
                  placeholder="Search Location..."
                  className="placeholder:md:ext-xl placeholder:text-md placeholder:text-[#ffffff9f] placeholder:font-Roboto  placeholder:font-normal  bg-transparent py-3 w-[85%] text-[#ffffff9f]"
                  onChange={HandleINput}
                />
                <div
                  className="absolute top-[50%] flex items-center justify-center -translate-y-[50%] h-full right-0 pr-2 text-white text-2xl cursor-pointer"
                  onClick={HandleSearch}
                >
                  <IoSearch />
                </div>
              </div>
              {error ? (
                <div className="flex flex-col items-center gap-y-10">
                  <img
                    src="/src/assets/undraw_not_found_re_bh2e.svg"
                    alt=""
                    className="mt-36"
                  />

                  <button
                    className="font-Roboto font-normal text-white bg-[#6c63ff] py-3 px-8"
                    onClick={() => window.location.reload()}
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-Roboto font-normal text-white text-base md:text-[18px] pt-10">
                    Weather Details...
                  </h3>
                  <h4 className="font-Roboto text-sm md:text-base font-normal text-white uppercase pt-6 md:pt-[52px] pb-7">
                    <h3>
                      {weatherDetails.description
                        ? weatherDetails.description
                        : "thunderstorm with light drizzle"}
                    </h3>
                  </h4>
                  <div className="flex flex-col gap-y-7 pb-9 border-b-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-base  font-Roboto font-normal text-[#ffffffb2]">
                        Temp max
                      </h5>
                      <div className="flex items-center gap-x-6">
                        <h6 className="text-base font-Roboto font-normal text-[#fff]">
                          {Math.floor(
                            weatherJosnMain.temp_max
                              ? weatherJosnMain.temp_max
                              : "16"
                          )}
                          °
                        </h6>
                        <span>
                          <FaTemperatureHigh className="text-red-300 text-[26px]" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-Roboto font-normal text-[#ffffffb2]">
                        Temp min
                      </h5>
                      <div className="flex items-center gap-x-6">
                        <h6 className="text-base font-Roboto font-normal text-[#fff]">
                          {Math.floor(
                            weatherJosnMain.temp_min
                              ? weatherJosnMain.temp_min
                              : "16"
                          )}
                          °
                        </h6>
                        <span>
                          <FaTemperatureLow className="text-sky-300 text-[26px]" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-Roboto font-normal text-[#ffffffb2]">
                        Humadity
                      </h5>
                      <div className="flex items-center gap-x-6">
                        <h6 className="text-base font-Roboto font-normal text-[#fff]">
                          {Math.floor(
                            weatherJosnMain.humadity
                              ? weatherJosnMain.humadity
                              : "16"
                          )}
                          %
                        </h6>
                        <img src={humadity} alt="" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-Roboto font-normal text-[#ffffffb2]">
                        Cloudy
                      </h5>
                      <div className="flex items-center gap-x-6">
                        <h6 className="text-base font-Roboto font-normal text-[#fff]">
                          {weatherJosn.clouds && weatherJosn.clouds.all
                            ? weatherJosn.clouds.all
                            : "80"}
                          %
                        </h6>
                        <img src={cloudyDetails} alt="" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-Roboto font-normal text-[#ffffffb2]">
                        Wind
                      </h5>
                      <div className="flex items-center gap-x-6">
                        <h6 className="text-base font-Roboto font-normal text-[#fff]">
                          {Math.floor(
                            weatherJosn.wind && weatherJosn.wind.speed
                              ? weatherJosn.wind.speed
                              : "24"
                          )}
                          km/h
                        </h6>
                        <img src={wind} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <div>
                <h4 className="font-Roboto font-normal text-white text-[18px] pt-10">
                  Today’s Weather Forecast...
                </h4>
                <div className="pt-14 flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img src={snow2} alt="" />
                    <div>
                      <h4 className="text-[18px] font-Roboto font-normal text-white">
                        09:00
                      </h4>
                      <p className="text-[18px] font-Roboto font-normal text-[#ffffffaf]">
                        Snow
                      </p>
                    </div>
                    <p className="text-[24px] font-Roboto font-normal text-[#ffffffaf]">
                      19°
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
