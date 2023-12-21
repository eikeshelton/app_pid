import { RootStackParamsList } from '../interfaces/Route';

declare global{
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamsList {}
    }
}
