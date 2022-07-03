import { useState, useEffect } from "react"
import salarios from "../salarios.json"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [salario, setSalario] = useState(0)
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
    if (salario < 1212 || salario > 6060) {
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
          Digite seu salario para calcular o valor das parcelas e o tempo de
          pagamento do financiamento de R$180.000,00
        </p>
        <input
          type="number"
          value={salario}
          onChange={e => setSalario(e.target.value)}
        />
        <button onClick={handleClick}>Calcular</button>
        <h3>{mensagem}</h3>
        <p>{parcela}</p>
        <p>{tempo}</p>
      </div>
    </div>
  )
}
