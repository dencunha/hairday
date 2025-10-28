import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e define a data mínima
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  //previne o comportamento padrão do formulário (carregar a página)
  event.preventDefault()

  try {
    // Recuperando o nome do Cliente
    const name = clientName.value.trim()
    
    if(!name){
      return alert("Informe o nome do cliente")
    }

    // Recuperar o horário selecionado
    const hourSelected = document.querySelector(".hour-selected")
    
    if(!hourSelected){
      return alert("Selecione o horário desejado")
    }

    // Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")
  
    // Insere a hora na dara
    const when = dayjs(selectedDate.value).add(hour, "hour")
    
    // Gerar um ID
    const id = new Date().getTime().toString()

    // Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    })

    // Recarregar os agendamentos
    await schedulesDay()

    // Limpa o input de nome do cliente
    clientName.value = ""

  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}