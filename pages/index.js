import { useState, useEffect } from "react"
import salarios from "../salarios.json"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [salario, setSalario] = useState()
  const [parcela, setParcela] = useState("")
  const [tempo, setTempo] = useState("")
  const [salariosFiltrados, setSalariosFiltrados] = useState([])
  const [mensagem, setMensagem] = useState("")

  const handleClick = () => {
    resultado(closest())
  }

  const filtrarSalarios = () => {
    salarios.forEach(sal => {
      setSalariosFiltrados(salariosFiltrados => [
        ...salariosFiltrados,
        sal.Salario,
      ])
    })
  }

  const closest = () =>
    salariosFiltrados.reduce((a, b) => {
      return Math.abs(b - salario) < Math.abs(a - salario) ? b : a
    })

  const resultado = valor => {
    if (salario < 1212 || salario > 6060 || !salario) {
      setMensagem("Salario fora da faixa de renda do programa")
      setParcela("")
      setTempo("")
      return {}
    } else {
      let r = salarios.find(el => el.Salario === valor)
      setMensagem("Resultado: ")
      setParcela(`R$ ${r.Parcela}`)
      setTempo(`${r.Meses} meses`)
      return r
    }
  }

  useEffect(() => {
    filtrarSalarios()
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <h1>Calculadora de simulação de prestações</h1>
        <p>
          <b>Digite seu salario</b> para calcular o valor das parcelas e o tempo
          de financiamento
        </p>
        <p>A faixa do programa é a partir de 1 salário minimo, 1212 reais</p>
        <label>
          Valor do salário:
          <br />
          <input
            type="number"
            value={salario}
            onChange={e => setSalario(e.target.value)}
          />
        </label>
        <button onClick={handleClick}>Calcular</button>
        <h3>{mensagem}</h3>
        <p>{parcela}</p>
        <p>{tempo}</p>
      </div>
    </div>
  )
}
