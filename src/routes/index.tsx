/* SPALANIE */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Spalanie,
});

function Spalanie() {
  type InputsType = {
    spalanie: number;
    cena: number;
    odlegosc: number;
    osoby: number;
    procent: number;
    parkingi: number;
    autostrada: number;
  };
  const [inputs, setInputs] = useState<InputsType>({
    spalanie: 0,
    cena: 0,
    odlegosc: 0,
    osoby: 1,
    procent: 0,
    parkingi: 0,
    autostrada: 0,
  });

  const [results, setResults] = useState<{
    spalaniePerOsoba?: number;
    caloscBez?: number;
    caloscZ?: number;
    zaOsobe?: number;
  }>({});

  useEffect(() => {
    const spalaniePerOsoba = (inputs.spalanie * inputs.procent) / 100;
    const caloscZ =
      ((inputs.spalanie + spalaniePerOsoba * inputs.osoby) / 100) *
        inputs.odlegosc *
        inputs.cena +
      inputs.parkingi +
      inputs.autostrada;
    setResults({
      spalaniePerOsoba,
      caloscBez: (inputs.spalanie / 100) * inputs.odlegosc * inputs.cena,
      caloscZ,
      zaOsobe: caloscZ / inputs.osoby,
    });
  }, [inputs]);

  const presetTablica = [
    { label: "🚄", value: 6 },
    { label: "🏙️", value: 7.2 },
    { label: "❄️", value: 8.5 },
  ];

  return (
    <div
      id="alles"
      className="flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
    >
      <div className="flex flex-col justify-center items-center gap-3 text-white">
        <h1 className="font-bold text-4xl mb-8 drop-shadow-[0_0_10px_green] ">
          Kalkulator wycieczkowy
        </h1>
        <div id="spalanie">
          <label htmlFor="inpSpalanie">Średnie spalanie:</label>
          <input
            id="inpSpalanie"
            type="number"
            min="0"
            step="0.5"
            value={inputs.spalanie}
            onChange={(e) =>
              setInputs((i) => ({ ...i, spalanie: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpSpalanie">l/100km</label>
          <br />
          <div id="emoji" className="flex justify-center mt-1">
            {presetTablica.map((element) => (
              <button
                onClick={() =>
                  setInputs((i) => ({ ...i, spalanie: element.value }))
                }
                className="border-2 p-1 w-full text-[1.4rem]"
                key={element.value}
              >
                {element.label}
              </button>
            ))}
          </div>
        </div>
        <div id="cena">
          <label htmlFor="inpCena">Cena paliwa:</label>
          <input
            id="inpCena"
            type="number"
            min="0"
            step="0.1"
            value={inputs.cena}
            onChange={(e) =>
              setInputs((i) => ({ ...i, cena: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpCena">zł/l</label>
        </div>
        <div id="odleglosc">
          <label htmlFor="inpOdleglosc">Odległość:</label>
          <input
            id="inpOdleglosc"
            type="number"
            min="0"
            value={inputs.odlegosc}
            onChange={(e) =>
              setInputs((i) => ({ ...i, odlegosc: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpOdleglosc">km</label>
        </div>
        <div id="osoby">
          <label htmlFor="inpOsoby">Liczba osób:</label>
          <input
            id="inpOsoby"
            type="number"
            min="1"
            max="5"
            value={inputs.osoby}
            onChange={(e) =>
              setInputs((i) => ({ ...i, osoby: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpOsoby">osób</label>
        </div>
        <div id="procent">
          <label htmlFor="inpProcent">Procent za osobę:</label>
          <input
            id="inpProcent"
            type="number"
            min="0"
            step="0.5"
            value={inputs.procent}
            onChange={(e) =>
              setInputs((i) => ({ ...i, procent: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpProcent">%</label>
          <span className="group relative text-red-600 cursor-pointer">
            🛈
            <span className="group-hover:opacity-100 opacity-0 absolute ml-1 bottom-0 transition-opacity text-white">
              waga/10
            </span>
          </span>
        </div>
        <div id="parkingi">
          <label htmlFor="inpParkingi">Parkingi:</label>
          <input
            id="inpParkingi"
            type="number"
            min="0"
            value={inputs.parkingi}
            onChange={(e) =>
              setInputs((i) => ({ ...i, parkingi: parseFloat(e.target.value) }))
            }
          />
          <label htmlFor="inpParkingi">zł</label>
        </div>
        <div id="autostrada">
          <label htmlFor="inpAutostrada">Autostrada:</label>
          <input
            id="inpAutostrada"
            type="number"
            min="0"
            value={inputs.autostrada}
            onChange={(e) =>
              setInputs((i) => ({
                ...i,
                autostrada: parseFloat(e.target.value),
              }))
            }
          />
          <label htmlFor="inpAutostrada">zł</label>
        </div>
        <div id="outputs" className="mt-12">
          <table id="table" className="border-separate border-spacing-x-5 ">
            <tbody>
              <tr>
                <td>Spalanie na osobę: </td>
                {results.spalaniePerOsoba !== undefined &&
                !isNaN(results.spalaniePerOsoba) ? (
                  <td>{results.spalaniePerOsoba.toFixed(3)} l/100km</td>
                ) : (
                  <td>brak</td>
                )}
              </tr>
              <tr>
                <td>Całość (bez osób): </td>
                {results.caloscBez !== undefined &&
                !isNaN(results.caloscBez) ? (
                  <td>{results.caloscBez.toFixed(2)} zł</td>
                ) : (
                  <td>brak</td>
                )}
              </tr>
              <tr>
                <td>Całość (z osobami): </td>
                {results.caloscZ !== undefined && !isNaN(results.caloscZ) ? (
                  <td>{results.caloscZ.toFixed(2)} zł</td>
                ) : (
                  <td>brak</td>
                )}
              </tr>
              <tr>
                <td>Za osobę: </td>
                {results.zaOsobe !== undefined && !isNaN(results.zaOsobe) ? (
                  <td>{results.zaOsobe.toFixed(2)} zł</td>
                ) : (
                  <td>brak</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
