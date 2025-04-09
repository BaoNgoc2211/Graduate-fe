interface ITitle{
  title: string;
}
const Title = ({title}: ITitle) => {
  return (
    <div className="text{#114a65} text-2xl font-medium">
      {title}
    </div>
  )
}
export default Title
