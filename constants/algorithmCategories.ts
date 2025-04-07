/**
 * Lista de categorias de algoritmos disponíveis no aplicativo
 */
export const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: 'swap-vertical',
    description: 'Algoritmos para ordenar coleções de dados',
    color: '#FF6B6B',
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    icon: 'search-outline',
    description: 'Técnicas para encontrar elementos em conjuntos de dados',
    color: '#4ECDC4',
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    icon: 'git-network-outline',
    description: 'Algoritmos para resolver problemas em estruturas de grafos',
    color: '#FFD166',
  },
  {
    id: 'network',
    title: 'Network Flow',
    icon: 'shuffle-outline',
    description: 'Algoritmos para otimização de fluxo em redes',
    color: '#06D6A0',
  },
  {
    id: 'string',
    title: 'String Processing',
    icon: 'text-outline',
    description: 'Manipulação e análise de strings e texto',
    color: '#118AB2',
  },
  {
    id: 'math',
    title: 'Mathematical & Numerical',
    icon: 'calculator-outline',
    description: 'Algoritmos para cálculos matemáticos e numéricos',
    color: '#9D4EDD',
  },
  {
    id: 'compression',
    title: 'Data Compression',
    icon: 'archive-outline',
    description: 'Técnicas para reduzir o tamanho de dados',
    color: '#FB8500',
  },
  {
    id: 'crypto',
    title: 'Cryptographic',
    icon: 'lock-closed-outline',
    description: 'Algoritmos para segurança e criptografia de dados',
    color: '#3A86FF',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: 'bulb-outline',
    description: 'Algoritmos para aprendizado de máquina e IA',
    color: '#F72585',
  },
];

/**
 * Interface que define a estrutura de uma categoria de algoritmo
 */
export interface AlgorithmCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export default algorithmCategories;