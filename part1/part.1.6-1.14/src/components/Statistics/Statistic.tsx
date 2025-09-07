type Props = IStatistic

export default function Statistic({type, value}: Props) {
    return (  
    <tr>
        <th scope="row" align="left">{type}:</th>
        <td align="center">
            {value}
        </td>
    </tr>
  )
}
