import { StyleSheet,Linking, Image, Share, TouchableOpacity } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
const shareContent = async () => {
  try {
    await Share.share({
      message: 'Check out this awesome profile! https://github.com/yourusername',
    });
  } catch (error) {
    console.error('Error sharing content:', error);
  }
};

export default function AboutMeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A7C7E7', dark: '#1E293B' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg.jpg')}
          style={styles.profileImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">About Me</ThemedText>
        <ThemedText style={[styles.description, { textAlign: 'justify' }]}>
  Hi, I'm a  developer specializing in building modern web and mobile applications. I love exploring new technologies and crafting user-friendly experiences.
</ThemedText>

<ThemedView style={styles.section}>
  <ThemedText type="subtitle">Contact Information</ThemedText>
  <ThemedText>Email: mekash1216@gmail.com</ThemedText>
  <TouchableOpacity onPress={() => Linking.openURL('https://t.me/MHWDU')}>
    <ThemedText style={{ color: 'blue' }}>Telegram: @MHWDU</ThemedText>
  </TouchableOpacity>
</ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Connect with Me</ThemedText>
          <ExternalLink href="https://github.com/yourusername">
            <ThemedText type="link">GitHub</ThemedText>
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/">
            <ThemedText type="link">LinkedIn</ThemedText>
          </ExternalLink>
        </ThemedView>

        <TouchableOpacity style={styles.shareButton} onPress={shareContent}>
          <Ionicons name="share-social" size={24} color="white" />
          <ThemedText style={styles.shareText}>Share</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: -50,
  },
  description: {
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    gap: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  shareText: {
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});
