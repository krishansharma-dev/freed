import { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Button({ children }: { children: ReactNode }) {
    return (
        <TouchableOpacity>
            <Text>
                {children}
            </Text>
        </TouchableOpacity>
    );
}