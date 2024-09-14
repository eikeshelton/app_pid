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
  const [calories] = useState(0);
  const [carbs] = useState(30);
  const [protein] = useState(50);
  const [fats] = useState(20);
  const [mealData, setMealData] = useState<{[key: string]: FoodItem[]}>({});

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [foodNameList, setFoodNameList] = useState<FoodList[]>([]);
  const [MyfoodList, setMyFoodNameList] = useState<FoodList[]>([]);
  const [foodGrams, setFoodGrams] = useState('');
  const width = Dimensions.get('window').width * 1;
  const height = Dimensions.get('window').height * 0.18;
  const data = [
    {
      name: 'Carboidratos',
      population: carbs,
      color: '#934dd2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Gorduras',
      population: fats,
      color: '#FFFFFF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Proteínas',
      population: protein,
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
    }
  }, [foodName, handleFoodList]);
  const addToFoodList = (item: FoodList) => {
    const foodGramsNumber = foodGrams ? parseFloat(foodGrams) : 1;
    const adjustedItem = {
      ...item,
      proteina_g: (item.proteina_g * foodGramsNumber) / 100,
      carboidrato_g: (item.carboidrato_g * foodGramsNumber) / 100,
      lipideos_g: (item.lipideos_g * foodGramsNumber) / 100,
      quantidade_g: (item.quantidade_g * foodGramsNumber) / 100,
    };
    setMyFoodNameList(prevList => [...prevList, adjustedItem]);
  };
  const renderItem = ({item}: {item: FoodList}) => (
    <FoodListContainer onPress={() => addToFoodList(item)}>
      <FoodName>Nome: {item.descricao}</FoodName>
      <FoodName>Proteína: {item.proteina_g} gramas</FoodName>
      <FoodName>Carboidratos: {item.carboidrato_g} gramas</FoodName>
      <FoodName>Gorduras: {item.lipideos_g} gramas</FoodName>
      <FoodName>
        Quantidades de nutrientes para {item.quantidade_g} gramas
      </FoodName>
    </FoodListContainer>
  );
  const renderItemMyList = ({item}: any) => (
    <FoodListContainer>
      <FoodName>Nome: {item.descricao}</FoodName>
      <FoodName>Proteína: {item.proteina_g} gramas</FoodName>
      <FoodName>Carboidratos: {item.carboidrato_g} gramas</FoodName>
      <FoodName>Gorduras: {item.lipideos_g} gramas</FoodName>
      <FoodName>
        Quantidades de nutrientes para {item.quantidade_g} gramas
      </FoodName>
    </FoodListContainer>
  );

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
          <DailyMacrosBox>
            <DailyMacros>Carb: {carbs} g</DailyMacros>
            <DailyMacros>Prot: {protein} g</DailyMacros>
            <DailyMacros>Gord: {fats} g</DailyMacros>
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
                  <CustomButton texto="Adicionar" />
                  <FlatList data={MyfoodList} renderItem={renderItemMyList} />
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
