import React, {useState} from 'react';
import CustonButton from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {InputComponent} from '../../components/Input';

interface Exercise {
  exercise: string;
  duration: string;
  comment: string;
}

interface DayTraining {
  day: string;
  exercises: Exercise[];
}

function TrainingMontage({}) {
  const [trainingDays, setTrainingDays] = useState<DayTraining[]>([]);
  const [currentDay, setCurrentDay] = useState('');
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [comment, setComment] = useState('');

  const handleAddExercise = () => {
    // Adicionar o exercício ao dia correspondente ou criar um novo dia se não existir
    const updatedTrainingDays = [...trainingDays];
    const existingDay = updatedTrainingDays.find(d => d.day === currentDay);

    if (existingDay) {
      existingDay.exercises.push({exercise, duration, comment});
    } else {
      updatedTrainingDays.push({
        day: currentDay,
        exercises: [{exercise, duration, comment}],
      });
    }

    setTrainingDays(updatedTrainingDays);
    setExercise('');
    setDuration('');
    setComment('');
  };

  const handleSaveTraining = () => {
    // Lógica para salvar o treino (pode ser uma chamada à API, armazenamento local, etc.)
    console.log('Treino Salvo:', trainingDays);
  };
  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <InputComponent
            onChangeText={text => setCurrentDay(text)}
            value={currentDay}
            placeholderTextColor={'silver'}
            placeholder="Dia da semana"
            isFocused={true} // O campo está focado quando esta prop é true
          />
          <InputComponent
            onChangeText={text => setExercise(text)}
            value={exercise}
            placeholderTextColor={'silver'}
            placeholder="Exercício"
            isFocused={true} // O campo está focado quando esta prop é true
          />
          <InputComponent
            onChangeText={text => setDuration(text)}
            value={duration}
            placeholderTextColor={'silver'}
            placeholder="Duração"
            isFocused={true} // O campo está focado quando esta prop é true
          />

          <InputComponent
            onChangeText={text => setComment(text)}
            value={comment}
            placeholderTextColor={'silver'}
            placeholder="Comentário"
            isFocused={true} // O campo está focado quando esta prop é true
          />
        </ScrollView>
        <CustonButton texto="Adicionar Exercício" onPress={handleAddExercise} />
        <CustonButton texto="Salvar Treino" onPress={handleSaveTraining} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default TrainingMontage;
