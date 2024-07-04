import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectComponent({
  label,
  placeholder,
  data,
  onChange,
  value,
  className,
}) {
  return (
    <Select onValueChange={onChange} value={value} className={className}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
