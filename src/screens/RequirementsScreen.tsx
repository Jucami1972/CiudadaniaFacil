import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, Surface, Divider, Button } from 'react-native-paper';
import type { NavigationProps } from '../types/navigation';

type Props = {
  navigation: NavigationProps;
};

const RequirementsScreen = ({ navigation }: Props) => {
  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Subheader style={styles.text}>Requisitos Básicos</List.Subheader>
          <List.Item
            title="Edad y Residencia"
            description="18 años o más y ser residente permanente legal"
            left={props => <List.Icon {...props} icon="account" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Tiempo de Residencia"
            description="5 años como residente permanente, o 3 años si está casado con ciudadano estadounidense"
            left={props => <List.Icon {...props} icon="calendar" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Presencia Física"
            description="Residencia continua y presencia física en EE.UU."
            left={props => <List.Icon {...props} icon="map-marker" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.text}>Requisitos de Conocimiento</List.Subheader>
          <List.Item
            title="Idioma Inglés"
            description="Capacidad de leer, escribir y hablar inglés básico"
            left={props => <List.Icon {...props} icon="translate" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Educación Cívica"
            description="Conocimiento básico del gobierno e historia de EE.UU."
            left={props => <List.Icon {...props} icon="school" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Buen Carácter Moral"
            description="Demostrar buen carácter moral"
            left={props => <List.Icon {...props} icon="check-circle" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.text}>Excepciones</List.Subheader>
          <List.Item
            title="Exención por Edad/Residencia"
            description="55 años + 15 años de residencia o 50 años + 20 años de residencia: exento del requisito de inglés"
            left={props => <List.Icon {...props} icon="account-group" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Servicio Militar"
            description="Condiciones especiales para miembros del ejército de EE.UU."
            left={props => <List.Icon {...props} icon="shield" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Discapacidad"
            description="Exenciones disponibles por discapacidad física o mental"
            left={props => <List.Icon {...props} icon="hand-heart" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.text}>Proceso de Solicitud</List.Subheader>
          <List.Item
            title="Formulario N-400"
            description="Presentar la solicitud de naturalización"
            left={props => <List.Icon {...props} icon="file-document" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
          <Divider />
          <List.Item
            title="Recursos de Estudio"
            description="USCIS ofrece materiales gratuitos de preparación"
            left={props => <List.Icon {...props} icon="book-open-variant" />}
            titleStyle={styles.text}
            descriptionStyle={styles.text}
          />
        </List.Section>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          Comenzar a Estudiar
        </Button>
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: '#000', // Color negro para texto legible
  },
  button: {
    margin: 16,
    marginBottom: 32,
  }
});

export default RequirementsScreen;
