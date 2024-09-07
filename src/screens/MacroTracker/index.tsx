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
  DailyMacrosBoxGraphic,
} from './style';
import {InputComponent} from '../../components/Input';
import CustomButton from '../../components/CustomizeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from 'react-native-chart-kit';
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
  const data = [
    {
      name: 'Carboidrato',
      population: 50,
      color: '#934dd2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Gordura',
      population: 20,
      color: '#FFFFFF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Proteína',
      population: 30,
      color: '#303030',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 2) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navbar>
          <Arrow onPress={() => setSelectedDay('Ontem')}>{'<'}</Arrow>
          <Day>{selectedDay}</Day>
          <Arrow onPress={() => setSelectedDay('Amanhã')}>{'>'}</Arrow>
        </Navbar>

        <DailyDisplay>
          <DailyCalories>Calorias Diárias</DailyCalories>
          <DailyCalories>{calories} kcal</DailyCalories>

          <DailyMacrosBoxGraphic>
            <PieChart
              data={data}
              width={240}
              height={150}
              accessor={'population'}
              chartConfig={chartConfig}
              backgroundColor={'transparent'}
              center={[0, 0]}
              paddingLeft="0"
              absolute={false}
              style={{flexDirection: 'column', alignItems: 'center'}}
            />
          </DailyMacrosBoxGraphic>
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
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              nestedScrollEnabled={true}
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
