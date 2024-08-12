import { createFileRoute } from "@tanstack/react-router";
import UnitInput from "../components/unit-input";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/zapisy")({
  component: Zapisy,
});

function Zapisy() {
  type InputyType = {
    Data: Date;
    Licznik: number;
    Paliwo: number;
    Płatność: number;
    CenaPaliwa: number;
  };

  const units = {
    Data: "r.",
    Licznik: "km",
    Paliwo: "l",
    Płatność: "zł",
    CenaPaliwa: "zł/l",
    Spalanie: "l/100km",
  };

  const [inputy, setInputy] = useState<InputyType>({
    Data: new Date(),
    Licznik: 0.0,
    Paliwo: 0.0,
    Płatność: 0.0,
    CenaPaliwa: 0.0,
  });

  let inputyTablica = [
    inputy.Licznik,
    inputy.Paliwo,
    inputy.Płatność,
    inputy.CenaPaliwa,
  ];

  useEffect(() => {
    if (inputy.Paliwo !== 0 && inputy.Płatność !== 0) {
      setInputy((i) => ({
        ...i,
        CenaPaliwa: parseFloat((i.Płatność / i.Paliwo).toFixed(2)),
      }));
    }
  }, [inputy.Paliwo, inputy.Płatność]);

  //dodawanie wynikow
  type wynikiType = InputyType & {
    Spalanie: number;
  };

  const [wyniki, setWyniki] = useState<wynikiType[]>([]);

  function dodaj() {
    setTextButtons((t) => [...t, "usuń"]);

    if (inputyTablica.every((element) => element != 0 && !isNaN(element))) {
      const nowyZapis: wynikiType = {
        ...inputy,
        Spalanie: parseFloat(
          ((inputy.Paliwo / inputy.Licznik) * 100).toFixed(3)
        ),
      };

      setWyniki((w) => [...w, nowyZapis]);
    }
  }

  function usun(index: number) {
    setTextButtons(textButtons.filter((_, itemIDX) => itemIDX !== index));
    setWyniki(wyniki.filter((_, itemIDX) => itemIDX !== index));
  }

  const [textButtons, setTextButtons] = useState<string[]>(["usuń"]);

  const isDate = (value: unknown): value is Date =>
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
            id="Data"
            label="Data"
            type="date"
            value={inputy.Data.toISOString().substring(0, 10)}
            onChange={(e) =>
              setInputy((i) => ({ ...i, Data: new Date(e.target.value) }))
            }
          />
          <UnitInput
            id="przejechane_km"
            label="Licznik"
            type="number"
            unit="km"
            min={0}
            value={inputy.Licznik}
            onChange={(e) =>
              setInputy((i) => ({ ...i, Licznik: parseFloat(e.target.value) }))
            }
          />
          <UnitInput
            id="Paliwo_w_litrach"
            label="Paliwo"
            type="number"
            unit="l"
            min={0}
            value={inputy.Paliwo}
            onChange={(e) =>
              setInputy((i) => ({ ...i, Paliwo: parseFloat(e.target.value) }))
            }
          />
          <UnitInput
            id="Płatność"
            label="Płatność"
            type="number"
            unit="zł"
            min={0}
            value={inputy.Płatność}
            onChange={(e) =>
              setInputy((i) => ({
                ...i,
                Płatność: parseFloat(e.target.value),
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
            value={inputy.CenaPaliwa}
            onChange={(e) =>
              setInputy((i) => ({
                ...i,
                CenaPaliwa: parseFloat(e.target.value),
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
          {/* SORTOWANIE WG WYBRANEGO ELEMENTU */}
          {wyniki.map((wynik, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-8 px-10 grid grid-cols-3 items-center gap-1"
            >
              {Object.entries(wynik).map((item) => (
                <>
                  <label>{item[0]}:</label>
                  <span>
                    {!isDate(item[1])
                      ? item[1]
                      : item[1]
                          .toISOString()
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                  </span>
                  <span>
                    {
                      units[
                        item[0] === "Spalanie"
                          ? "Spalanie"
                          : (item[0] as keyof typeof units)
                      ]
                    }
                  </span>
                </>
              ))}
              <div id="usunBtn" className="flex col-span-3 justify-center">
                <button
                  key={idx}
                  onClick={() => {
                    if (textButtons[idx] === "usuń") {
                      setTextButtons((teksty) =>
                        teksty.map((tekst, index) =>
                          index === idx ? "na pewno?" : tekst
                        )
                      );
                      const x = setTimeout(() => {
                        setTextButtons((teksty) =>
                          teksty.map((tekst, index) =>
                            index === idx ? "usuń" : tekst
                          )
                        );
                      }, 2000);
                      //return () => clearTimeout(x);
                    }
                    if (textButtons[idx] === "na pewno?") {
                      usun(idx);
                    }
                  }}
                  className="mt-6 border-2 border-red-500 px-4 py-2 rounded-lg bg-red-500/60 font-bold active:bg-red-500/80 hover:shadow-[0_0_10px_1px] hover:shadow-red-500"
                >
                  {textButtons[idx]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
