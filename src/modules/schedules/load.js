import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { scheduleShow } from "../schedules/show.js"
import { hoursLoad } from "../form/hours-load.js"

// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay(){
  
  // Os horários disponíveis (horário futuro + não agendado) do lado esquerdo (formulário)
  //obtem a data do input
  const date = selectedDate.value

  // Buscar na API os agendamentos baseado na data
  const dailySchedules = await scheduleFetchByDay({ date })
  
  // Exibe os agendamentos
  scheduleShow({ dailySchedules })

  
  //Renderiza as horas disponíveis
  hoursLoad({ date, dailySchedules })
  
  // Buscar na API os agendamentos para carregar do lado direito
}