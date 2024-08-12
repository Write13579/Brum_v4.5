import { createFileRoute } from "@tanstack/react-router";
import UnitInput from "../components/unit-input";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/zapisy")({
  component: Zapisy,
});

function Zapisy() {
  type InputyType = {
    data: Date;
    licznik: number;
    paliwo: number;
    platnosc: number;
    cenaZaLitr: number;
  };

  const units = {
    data: "r.",
    licznik: "km",
    paliwo: "l",
    platnosc: "zł",
    cenaZaLitr: "zł",
    spalanie: "l/100km",
  };

  const [inputy, setInputy] = useState<InputyType>({
    data: new Date(),
    licznik: 0.0,
    paliwo: 0.0,
    platnosc: 0.0,
    cenaZaLitr: 0.0,
  });

  let inputyTablica = [
    inputy.licznik,
    inputy.paliwo,
    inputy.platnosc,
    inputy.cenaZaLitr,
  ];

  useEffect(() => {
    if (inputy.paliwo !== 0 && inputy.platnosc !== 0) {
      setInputy((i) => ({
        ...i,
        cenaZaLitr: parseFloat((i.platnosc / i.paliwo).toFixed(2)),
      }));
    }
  }, [inputy.paliwo, inputy.platnosc]);

  //dodawanie wynikow
  type wynikiType = InputyType & {
    spalanieNaSto: number;
  };

  const [wyniki, setWyniki] = useState<wynikiType[]>([]);

  function dodaj() {
    if (inputyTablica.every((element) => element != 0 && !isNaN(element))) {
      const nowyZapis: wynikiType = {
        ...inputy,
        spalanieNaSto: parseFloat(
          ((inputy.paliwo / inputy.licznik) * 100).toFixed(3)
        ),
      };

      setWyniki((w) => [...w, nowyZapis]);
    }
  }

  function usun(index: number) {
    setWyniki(wyniki.filter((_, itemIDX) => itemIDX !== index));
  }
  const isDate = (value: any): value is Date =>
    value instanceof Date && !isNaN(value.getTime());
  return (
    <div
      id="alles"
      className="flex justify-center items-center flex-col bg-gray-800 dark:bg-white p-8"
    >
      <div className="flex flex-col justify-center gap-3 text-white">
        <h1 className="font-bold text-4xl mb-8 drop-shadow-[0_0_10px_red] text-center w-full animate-Shake">
          Zapisy spalania
        </h1>
        <div id="inputy" className="flex items-start flex-col gap-4">
          <UnitInput
            id="data"
            label="Data"
            type="date"
            value={inputy.data.toISOString().substring(0, 10)}
            onChange={(e) =>
              setInputy((i) => ({ ...i, data: new Date(e.target.value) }))
            }
          />
          <UnitInput
            id="przejechane_km"
            label="Licznik"
            type="number"
            unit="km"
            min={0}
            value={inputy.licznik}
            onChange={(e) =>
              setInputy((i) => ({ ...i, licznik: parseFloat(e.target.value) }))
            }
          />
          <UnitInput
            id="paliwo_w_litrach"
            label="Paliwo"
            type="number"
            unit="l"
            min={0}
            value={inputy.paliwo}
            onChange={(e) =>
              setInputy((i) => ({ ...i, paliwo: parseFloat(e.target.value) }))
            }
          />
          <UnitInput
            id="platnosc"
            label="Płatność"
            type="number"
            unit="zł"
            min={0}
            value={inputy.platnosc}
            onChange={(e) =>
              setInputy((i) => ({
                ...i,
                platnosc: parseFloat(e.target.value),
              }))
            }
          />
          <UnitInput
            id="cena_za_litr"
            label="Cena paliwa"
            type="number"
            unit="zł/l"
            min={0}
            step={0.01}
            value={inputy.cenaZaLitr}
            onChange={(e) =>
              setInputy((i) => ({
                ...i,
                cenaZaLitr: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <button
          onClick={dodaj}
          className="my-10 mx-24 border-2 border-red-500 py-4 rounded-lg bg-red-500/60 font-bold active:bg-red-500/80 hover:shadow-[0_0_10px_1px] hover:shadow-red-500"
        >
          Dodaj
        </button>
        <div id="wyniki" className="flex flex-col gap-8">
          {wyniki.map((wynik, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-10 flex flex-col items-center gap-1"
            >
              {Object.entries(wynik).map((item) => (
                <div>
                  <label>{item[0]}:</label>
                  <span>
                    {!isDate(item[1])
                      ? item[1]
                      : item[1].toISOString().substring(0, 10)}
                  </span>
                </div>
              ))}

              {/* <div>
                <label>Data: </label>
                <span>{wynik.data.toISOString().substring(0, 10)}</span>
                <span>{units.data}</span>
              </div>
              <div>
                <label>Licznik: </label>
                <span>{wynik.licznik}</span>
                <span>{units.licznik}</span>
              </div>
              <div>
                <label>Paliwo: </label>
                <span>{wynik.paliwo}</span>
                <span>{units.paliwo}</span>
              </div>
              <div>
                <label>Płatność: </label>
                <span>{wynik.platnosc}</span>
                <span>{units.platnosc}</span>
              </div>
              <div>
                <label>Cena paliwa: </label>
                <span>{wynik.cenaZaLitr}</span>
                <span>{units.cenaZaLitr}</span>
              </div>
              <div>
                <label>Spalanie: </label>
                <span>{wynik.spalanieNaSto}</span>
                <span>{units.spalanie}</span>
              </div> */}
              <button onClick={() => usun(idx)}>usun</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
