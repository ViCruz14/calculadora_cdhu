import { useState, useEffect } from "react"
import salarios from "../salarios.json"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [salario, setSalario] = useState(0)
  const [parcela, setParcela] = useState("")
  const [tempo, setTempo] = useState("")
  const [salariosFiltrados, setSalariosFiltrados] = useState([])

  const handleClick = () => {
    let r = resultado(closest())
    setParcela(r.Parcela)
    setTempo(r.Meses)
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
    return salarios.find(el => el.Salario === valor)
  }

  useEffect(() => {
    filtrarSalarios()
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <h1>Bem vindo a calculadora da CDHU</h1>
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
        <p>R${parcela}</p>
        <p>{tempo} meses</p>
      </div>
    </div>
  )
}
