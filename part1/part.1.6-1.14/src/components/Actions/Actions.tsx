import './actions.css'

interface Action{
  label: string
  fn(value: number): void
}

interface Props {
  actions: Action[]
}

export default function Actions({actions}: Props) {
  return (
  <ul className="actionList" style={{margin: 0}}>
    {
      actions.map((action,index) => (
        <button key={index} onClick={() => action.fn(1)}>{action.label}</button>
      ))
    }      
  </ul>)  
}
