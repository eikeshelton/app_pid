import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Modal, Dimensions, Text} from 'react-native';
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
  ButtonSubmit,
  ButtonSubmitText,
  ContainerInput,
} from './style';
import {InputComponent} from '../../components/Input';
import CustomButton from '../../components/CustomizeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from 'react-native-chart-kit';
import {addDays, subDays, format} from 'date-fns';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';

interface FoodItemInterface {
  id_refeicao?: number;
  alimento_usuario_id: number;
  id_alimento: number;
  calories: number;
  id: number;
  carbs: number;
  name: string;
  grams: number;
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
interface Meals {
  nome: string;
  descricao?: string;
  id: number;
}
const MacroTracker = () => {
  const {user} = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [mealData, setMealData] = useState<FoodItemInterface[]>([]);
  const [meals, setMeals] = useState<Meals[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedMealId, setSelectedMealId] = useState(Number);
  const [foodName, setFoodName] = useState('');
  const [foodNameList, setFoodNameList] = useState<FoodList[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodList | null>(
    null,
  );
  const [foodGrams, setFoodGrams] = useState('');
  const width = Dimensions.get('window').width * 1;
  const height = Dimensions.get('window').height * 0.18;

  useEffect(() => {
    fetchDataTotal(); // Atualiza os dados da refeição quando selectedDate mudar
  }, [selectedDate]);

  const goToPreviousDay = () => {
    setSelectedDate(prevDate => subDays(prevDate, 1));
  };

  // Função para atualizar a data para o próximo dia
  const goToNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };

  // Formata a data para exibição
  const formattedDate = format(selectedDate, 'dd/MM/yyyy');
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
  const handleRemoveFood = (mealId: number, index: number) => {
    const updatedMeal = mealData.filter(
      foodItem => foodItem.id_refeicao === mealId,
    );
    updatedMeal.splice(index, 1);

    const newMealData = mealData
      .filter(foodItem => foodItem.id_refeicao !== mealId)
      .concat(updatedMeal);
    setMealData(newMealData);
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

  const fetchData = async () => {
    try {
      const response = await api.get('/buscar/id/refeicao');
      if (response.data) {
        setMeals(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchmealData = async () => {
    try {
      const formattedDateForApi = format(selectedDate, 'yyyy-MM-dd');
      const response = await api.post('/buscar/info/alimento', {
        id_usuario: user.id,
        data: formattedDateForApi,
      });
      if (response.data) {
        setMealData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataTotal = async () => {
    try {
      const formattedDateForApi = format(selectedDate, 'yyyy-MM-dd');
      const response = await api.get(
        `/refeicoes/${user.id}/${formattedDateForApi}`,
      );
      const data = response.data;
      if (data) {
        setCalories(data.total_energia_kcal);
        setCarbs(data.total_carboidrato_g);
        setProtein(data.total_proteina_g);
        setFats(data.total_lipideos_g);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(); // Chame a função async
    fetchmealData();
    fetchDataTotal();
  }, [calories, modalVisible]);

  const addToFoodList = (item: FoodList) => {
    setSelectedFoodItem(item);
    setFoodName(item.descricao);
    setFoodGrams(item.quantidade_g.toString());
  };
  const handleDateClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (text: string) => {
    setDisplayedText(text);
  };

  const handleInputBlur = () => {
    if (displayedText) {
      const [day, month, year] = displayedText.split('/').map(Number);
      if (day && month && year) {
        const formattedDate = new Date(year, month - 1, day);
        setSelectedDate(formattedDate); // Atualiza diretamente o selectedDate com a data correta
        setDisplayedText(formattedDate.toLocaleDateString()); // Atualiza o texto exibido com a data formatada
      } else {
        console.warn('Formato de data inválido.');
      }
    }
    setIsEditing(false);
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
  const fetchIdRefeicao = async () => {
    try {
      const formattedDateForApi = format(selectedDate, 'yyyy-MM-dd');
      const response = await api.post('/refeicoes/alimentos/', {
        id_usuario: user.id,
        refeicao_id: selectedMealId,
        quantidade: parseInt(foodGrams, 10),
        alimento_id: selectedFoodItem?.id,
        data: formattedDateForApi,
      });
      if (response.data) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToMeal = () => {
    fetchIdRefeicao();
    if (selectedMeal && foodGrams && selectedFoodItem) {
      // Verifique se a quantidade em gramas é um número válido
      const grams = parseFloat(foodGrams);
      if (isNaN(grams) || grams <= 0) {
        return;
      }

      // Calcule os valores nutricionais com base na quantidade informada

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
          <Arrow onPress={goToPreviousDay}>{'<'}</Arrow>
          {isEditing ? (
            <ContainerInput>
              <InputComponent
                value={
                  typeof selectedDate === 'string'
                    ? selectedDate
                    : selectedDate.toLocaleDateString()
                }
                onChangeText={handleInputChange}
                mask="[00]/[00]/[0000]"
                isFocused={isEditing}
              />

              <ButtonSubmit onPress={handleInputBlur}>
                <ButtonSubmitText>confirmar</ButtonSubmitText>
              </ButtonSubmit>
            </ContainerInput>
          ) : (
            <Day onPress={handleDateClick}>{formattedDate}</Day>
          )}
          <Arrow onPress={goToNextDay}>{'>'}</Arrow>
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
          <MealContainer key={meal.id}>
            <MealTitleContainer>
              <MealTitle>
                <Text>{meal.nome} </Text>
              </MealTitle>
              <MealTitle>
                <Text>
                  {(
                    mealData
                      .filter(foodItem => foodItem.id_refeicao === meal.id)
                      .reduce(
                        (acc: number, food: FoodItemInterface) =>
                          acc + food.calories,
                        0,
                      ) || 0
                  ).toFixed(3)}{' '}
                  kcal
                </Text>
              </MealTitle>
            </MealTitleContainer>

            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              nestedScrollEnabled={true}
              data={
                mealData.filter(foodItem => foodItem.id_refeicao === meal.id) ||
                []
              }
              renderItem={({item, index}) => (
                <FoodItem>
                  <FoodItemNameContainer>
                    <MealText>
                      <Text>
                        {item.name} ({item.grams}g)
                      </Text>
                    </MealText>
                    <Ionicons
                      name="close"
                      size={20}
                      color="white"
                      onPress={() => handleRemoveFood(meal.id, index)}
                    />
                  </FoodItemNameContainer>
                  <MealText>
                    <Text>{`${item.calories.toFixed(3)}kcal`}</Text>
                  </MealText>
                  <MealText>
                    <Text>{`C: ${item.carbs.toFixed(
                      2,
                    )}g P: ${item.protein.toFixed(2)}g G: ${item.fats.toFixed(
                      2,
                    )}g`}</Text>
                  </MealText>
                </FoodItem>
              )}
              keyExtractor={item => item.alimento_usuario_id.toString()}
            />

            <AddFoodContainer>
              <Ionicons
                name="add"
                size={40}
                color="#934dd2"
                onPress={() => {
                  setSelectedMeal(meal.nome);
                  setSelectedMealId(meal.id);
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
