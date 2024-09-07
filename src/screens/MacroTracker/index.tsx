import React, {useState} from 'react';
import {FlatList, ScrollView, Modal} from 'react-native';
import {
  Container,
  Navbar,
  Arrow,
  Day,
  DailyDisplay,
  MealContainer,
  FoodItem,
  ModalContainer,
  DailyCalories,
  DailyMacros,
  DailyMacrosBox,
  MealText,
  MealTitleContainer,
  MealTitle,
  AddFoodContainer,
} from './style';
import {InputComponent} from '../../components/Input';
import CustomButton from '../../components/CustomizeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const meals = ['Café da Manhã', 'Almoço', 'Lanche da Tarde', 'Janta', 'Ceia'];
interface FoodItem {
  name: string;
  calories: number;
  grams: number;
  carbs: number;
  protein: number;
  fats: number;
}
const MacroTracker = () => {
  const [selectedDay, setSelectedDay] = useState('Hoje');
  const [calories] = useState(0);
  const [carbs] = useState(0);
  const [protein] = useState(0);
  const [fats] = useState(0);
  const [mealData, setMealData] = useState<{[key: string]: FoodItem[]}>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [foodGrams, setFoodGrams] = useState('');

  const handleAddFood = () => {
    if (foodName && foodGrams) {
      const updatedMeal = mealData[selectedMeal!] || [];
      const foodMacros: FoodItem = {
        name: foodName,
        grams: parseInt(foodGrams, 10),
        calories: Math.floor(Math.random() * 20),
        carbs: Math.floor(Math.random() * 10),
        protein: Math.floor(Math.random() * 10),
        fats: Math.floor(Math.random() * 10),
      };
      setMealData({
        ...mealData,
        [selectedMeal!]: [...updatedMeal, foodMacros],
      });
      setFoodName('');
      setFoodGrams('');
      setModalVisible(false);
    }
  };

  const handleRemoveFood = (meal: string, index: number) => {
    const updatedMeal = [...mealData[meal]];
    updatedMeal.splice(index, 1);
    setMealData({
      ...mealData,
      [meal]: updatedMeal,
    });
  };

  return (
    <Container>
      <ScrollView>
        <Navbar>
          <Arrow onPress={() => setSelectedDay('Ontem')}>{'<'}</Arrow>
          <Day>{selectedDay}</Day>
          <Arrow onPress={() => setSelectedDay('Amanhã')}>{'>'}</Arrow>
        </Navbar>

        <DailyDisplay>
          <DailyCalories>Calorias Diárias</DailyCalories>
          <DailyCalories>{calories} kcal</DailyCalories>
          <DailyMacrosBox>
            <DailyMacros>Carb: {carbs} g</DailyMacros>
            <DailyMacros>Prot: {protein} g</DailyMacros>
            <DailyMacros>Gord: {fats} g</DailyMacros>
          </DailyMacrosBox>
        </DailyDisplay>

        {meals.map(meal => (
          <MealContainer key={meal}>
            <MealTitleContainer>
              <MealTitle>{meal}</MealTitle>
              <MealTitle>
                {' '}
                {mealData[meal]?.reduce(
                  (acc, food) => acc + food.calories,
                  0,
                ) || 0}{' '}
                kcal
              </MealTitle>
            </MealTitleContainer>

            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={mealData[meal]}
              renderItem={({item, index}) => (
                <FoodItem>
                  <MealText>
                    {item.name} ({item.grams}g)
                  </MealText>
                  <MealText>{`${item.calories}kcal`}</MealText>
                  <MealText>{`C: ${item.carbs}g P: ${item.protein}g G: ${item.fats}g`}</MealText>
                  <Ionicons
                    name="close"
                    size={20}
                    color="white"
                    onPress={() => handleRemoveFood(meal, index)}
                  />
                </FoodItem>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            <AddFoodContainer>
              <Ionicons
                name="add"
                size={40}
                color="#934dd2"
                onPress={() => {
                  setSelectedMeal(meal);
                  setModalVisible(true);
                }}
              />
            </AddFoodContainer>
          </MealContainer>
        ))}

        <Modal visible={modalVisible} animationType="slide">
          <ModalContainer>
            <InputComponent
              placeholder="Nome do alimento"
              placeholderTextColor={'silver'}
              value={foodName}
              onChangeText={setFoodName}
              isFocused={false}
            />
            <InputComponent
              placeholder="Quantidade (g)"
              placeholderTextColor={'silver'}
              keyboardType="numeric"
              value={foodGrams}
              onChangeText={setFoodGrams}
              isFocused={false}
            />
            <CustomButton texto="Adicionar" onPress={handleAddFood} />
            <CustomButton
              texto="Cancelar"
              onPress={() => setModalVisible(false)}
            />
          </ModalContainer>
        </Modal>
      </ScrollView>
    </Container>
  );
};

export default MacroTracker;
