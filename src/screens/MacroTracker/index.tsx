import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Modal, Dimensions} from 'react-native';
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
  FoodListContainer,
  FoodName,
  ModalBody,
  ModalHeader,
  FoodItemNameContainer,
} from './style';
import {InputComponent} from '../../components/Input';
import CustomButton from '../../components/CustomizeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from 'react-native-chart-kit';
import api from '../../services/api';
const meals = ['Café da Manhã', 'Almoço', 'Lanche da Tarde', 'Janta', 'Ceia'];
interface FoodItem {
  name: string;
  calories: number;
  grams: number;
  carbs: number;
  protein: number;
  fats: number;
}
interface FoodList {
  id: number;
  grupo: string;
  descricao: string;
  energia_kcal: number;
  proteina_g: number;
  carboidrato_g: number;
  quantidade_g: number;
  lipideos_g: number;
}
const MacroTracker = () => {
  const [selectedDay, setSelectedDay] = useState('Hoje');
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [mealData, setMealData] = useState<{[key: string]: FoodItem[]}>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [foodNameList, setFoodNameList] = useState<FoodList[]>([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodList | null>(
    null,
  );
  const [foodGrams, setFoodGrams] = useState('');
  const width = Dimensions.get('window').width * 1;
  const height = Dimensions.get('window').height * 0.18;
  const calculateTotals = () => {
    const totalCarbs = Object.values(mealData)
      .flat()
      .reduce((acc, food) => acc + food.carbs, 0);
    const totalProtein = Object.values(mealData)
      .flat()
      .reduce((acc, food) => acc + food.protein, 0);
    const totalFats = Object.values(mealData)
      .flat()
      .reduce((acc, food) => acc + food.fats, 0);
    const totalCalories = Object.values(mealData)
      .flat()
      .reduce((acc, food) => acc + food.calories, 0);

    return {totalCarbs, totalProtein, totalFats, totalCalories};
  };

  const {totalCarbs, totalProtein, totalFats} = calculateTotals();
  useEffect(() => {
    const {totalCarbs, totalProtein, totalFats, totalCalories} =
      calculateTotals();
    setCarbs(totalCarbs);
    setProtein(totalProtein);
    setFats(totalFats);
    setCalories(totalCalories);
  }, [mealData]);
  const data = [
    {
      name: 'Carboidratos',
      population: totalCarbs,
      color: '#934dd2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Gorduras',
      population: totalFats,
      color: '#FFFFFF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Proteínas',
      population: totalProtein,
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
  const handleRemoveFood = (meal: string, index: number) => {
    const updatedMeal = [...mealData[meal]];
    updatedMeal.splice(index, 1);
    setMealData({
      ...mealData,
      [meal]: updatedMeal,
    });
  };
  const handleFoodList = React.useCallback(async () => {
    try {
      const response = await api.get(`/alimentos/${foodName}`);
      if (response.data) {
        setFoodNameList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [foodName]);

  useEffect(() => {
    if (foodName.length > 0) {
      handleFoodList();
    } else {
      setFoodNameList([]);
      setFoodGrams('');
    }
  }, [foodName, handleFoodList]);
  const addToFoodList = (item: FoodList) => {
    setSelectedFoodItem(item);
    setFoodName(item.descricao);
    setFoodGrams(item.quantidade_g.toString());
  };
  const renderItem = ({item}: {item: FoodList}) => (
    <FoodListContainer onPress={() => addToFoodList(item)}>
      <FoodName>Nome: {item.descricao}</FoodName>
      <FoodName>Proteína: {item.proteina_g.toFixed(2)} gramas</FoodName>
      <FoodName>Carboidratos: {item.carboidrato_g.toFixed(2)} gramas</FoodName>
      <FoodName>Gorduras: {item.lipideos_g.toFixed(2)} gramas</FoodName>
      <FoodName>
        Quantidades de nutrientes para {item.quantidade_g.toFixed(2)} gramas
      </FoodName>
    </FoodListContainer>
  );
  const addToMeal = () => {
    if (selectedMeal && foodGrams && selectedFoodItem) {
      // Verifique se a quantidade em gramas é um número válido
      const grams = parseFloat(foodGrams);
      if (isNaN(grams) || grams <= 0) {
        console.log('Quantidade inválida');
        return;
      }

      // Calcule os valores nutricionais com base na quantidade informada
      const newFood: FoodItem = {
        name: selectedFoodItem.descricao,
        calories:
          selectedFoodItem.energia_kcal *
          (grams / selectedFoodItem.quantidade_g),
        grams: grams,
        carbs:
          selectedFoodItem.carboidrato_g *
          (grams / selectedFoodItem.quantidade_g),
        protein:
          selectedFoodItem.proteina_g * (grams / selectedFoodItem.quantidade_g),
        fats:
          selectedFoodItem.lipideos_g * (grams / selectedFoodItem.quantidade_g),
      };

      // Adicione o alimento à refeição
      setMealData(prevData => ({
        ...prevData,
        [selectedMeal]: [...(prevData[selectedMeal] || []), newFood],
      }));

      // Limpa os campos do modal e fecha o modal após adicionar
      setFoodName('');
      setFoodGrams('');
      setSelectedFoodItem(null);
      setModalVisible(false);
    } else {
      console.log('Selecione uma refeição e informe a quantidade');
    }
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
          <DailyCalories>{calories.toFixed(3)} kcal</DailyCalories>
          <DailyMacrosBox>
            <DailyMacros>Carb: {carbs.toFixed(2)} g</DailyMacros>
            <DailyMacros>Prot: {protein.toFixed(2)} g</DailyMacros>
            <DailyMacros>Gord: {fats.toFixed(2)} g</DailyMacros>
          </DailyMacrosBox>
          <DailyMacrosBoxGraphic>
            <PieChart
              data={data}
              width={width}
              height={height}
              accessor={'population'}
              chartConfig={chartConfig}
              backgroundColor={'transparent'}
              center={[0, 0]}
              paddingLeft="0"
              absolute={false}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
                  <FoodItemNameContainer>
                    <MealText>
                      {item.name} ({item.grams}g)
                    </MealText>
                    <Ionicons
                      name="close"
                      size={20}
                      color="white"
                      onPress={() => handleRemoveFood(meal, index)}
                    />
                  </FoodItemNameContainer>
                  <MealText>{`${item.calories.toFixed(3)}kcal`}</MealText>
                  <MealText>{`C: ${item.carbs.toFixed(
                    2,
                  )}g P: ${item.protein.toFixed(2)}g G: ${item.fats.toFixed(
                    2,
                  )}g`}</MealText>
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
            <FlatList
              data={foodNameList}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={
                <ModalHeader>
                  <InputComponent
                    placeholder="Nome do alimento"
                    placeholderTextColor={'silver'}
                    value={foodName}
                    onChangeText={setFoodName}
                    isFocused={false}
                  />
                </ModalHeader>
              }
              ListFooterComponent={
                <ModalBody>
                  <InputComponent
                    placeholder="Quantidade (g)"
                    placeholderTextColor={'silver'}
                    keyboardType="numeric"
                    value={foodGrams}
                    onChangeText={setFoodGrams}
                    isFocused={false}
                  />
                  <CustomButton texto="Adicionar" onPress={addToMeal} />

                  <CustomButton
                    texto="Cancelar"
                    onPress={() => setModalVisible(false)}
                  />
                </ModalBody>
              }
            />
          </ModalContainer>
        </Modal>
      </ScrollView>
    </Container>
  );
};

export default MacroTracker;
