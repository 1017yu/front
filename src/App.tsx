import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Select from '@/components/ui/Seletct';
import TextInput from '@/components/ui/TextInput';
import Toggle from '@/components/ui/Toggle';
import LoadingSpinner from './components/ui/LoadingSpinner';

export default function App() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="flex flex-col gap-2">
          <Button onClick={() => console.log('hello')} contents="hello" />
          <Button
            onClick={() => console.log('hello')}
            contents="hello"
            secondary
          />
          <Button
            onClick={() => console.log('hello')}
            contents="hello"
            disabled
          />
          <Button
            onClick={() => console.log('hello')}
            contents={<LoadingSpinner color="white" />}
            disabled
          />
          <Button
            onClick={() => console.log('hello')}
            contents={<LoadingSpinner color="accent" />}
            disabled
            secondary
          />
          <TextInput
            onChange={() => {
              console.log('input');
            }}
            placeholder="email"
            value="email"
          />
          <Toggle />
          <Select
            name="place"
            onChange={() => {
              console.log('셀렉트');
            }}
            options={[
              { name: '1', value: '1' },
              { name: '2', value: '2' },
              { name: '3', value: '3' },
            ]}
            value=""
          />
        </div>
      </Container>
    </>
  );
}
