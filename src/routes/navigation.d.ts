import { RootStackParamsList } from '../interfaces/Route';

declare global{
    namespace ReactNavigation{
        interface RootParamsList extends RootStackParamsList {}
    }
}
