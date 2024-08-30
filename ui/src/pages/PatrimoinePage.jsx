import React, { useEffect, useState } from "react";
import { getValeurPatrimoine, getValeurPatrimoineRange } from "../services/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PatrimoinePage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [submitedDate, setSubmitedDate] = useState(date);
  const [valeurPatrimoine, setValeurPatrimoine] = useState("");
  const [rangeData, setRangeData] = useState({
    type: "month",
    dateDebut: "",
    dateFin: "",
    jour: 1,
  });
  const [chartData, setChartData] = useState(null);

  console.log(chartData);
  const handleGetValeurPatrimoine = async () => {
    const response = (await getValeurPatrimoine(date)).data.valeur;
    setSubmitedDate(date);
    setValeurPatrimoine(response);
  };

  useEffect(() => {
    handleGetValeurPatrimoine();
  }, []);

  const handleGetValeurPatrimoineRange = async () => {
    const response = await getValeurPatrimoineRange(rangeData);
    const dates = response.data.map((entry) => entry.date);
    const values = response.data.map((entry) => entry.valeur);
    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Valeur du Patrimoine",
          data: values,
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <div className="container-fluid">
      <h1>Page Patrimoine</h1>
      <div>
        <div className="d-flex col-6">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleGetValeurPatrimoine}
          >
            Validate
          </button>
        </div>
        <h5 className="mt-4 mb-4">
          valeur du patrimoine au {new Date(submitedDate).toLocaleDateString()}{" "}
          :{" "}
          <span className="bg-warning px-4 py-1 text-dark">
            {parseFloat(valeurPatrimoine).toLocaleString()}
          </span>
        </h5>
        <hr class="my-4" />
      </div>
      <h3>evolution patrimoine</h3>
      <div className="d-flex gap-5 align-items-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="d-flex gap-2 flex-column col-md-4"
        >
          <label htmlFor="dateDebut">date debut :</label>
          <input
            type="date"
            id="dateDebut"
            required
            className="form-control"
            value={rangeData.dateDebut}
            onChange={(e) =>
              setRangeData({ ...rangeData, dateDebut: e.target.value })
            }
          />
          <label htmlFor="dateFin">date fin :</label>
          <input
            type="date"
            required
            id="dateFin"
            className="form-control"
            value={rangeData.dateFin}
            onChange={(e) =>
              setRangeData({ ...rangeData, dateFin: e.target.value })
            }
          />
          <label htmlFor="jour">Jour : </label>
          <input
            required
            id="jour"
            type="number"
            className="form-control"
            value={rangeData.jour}
            onChange={(e) =>
              setRangeData({ ...rangeData, jour: e.target.value })
            }
          />
          <button
            className="btn btn-primary"
            onClick={handleGetValeurPatrimoineRange}
          >
            Validate Range
          </button>
        </form>
        {chartData && (
          <div className="col-md-7">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Valeur du Patrimoine",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PatrimoinePage;
