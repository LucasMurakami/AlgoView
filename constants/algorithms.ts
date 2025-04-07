export const categoriesMap = {
    'sorting': {
      title: 'Algoritmos de Ordenação',
      description: 'Algoritmos que colocam elementos de uma lista em uma certa ordem.',
      icon: 'swap-vertical',
      algorithms: [
        { id: 'bubble-sort', name: 'Bubble Sort', icon: 'git-commit-outline' },
        { id: 'quick-sort', name: 'Quick Sort', icon: 'flash-outline' },
        { id: 'merge-sort', name: 'Merge Sort', icon: 'git-merge-outline' },
        { id: 'insertion-sort', name: 'Insertion Sort', icon: 'arrow-down-outline' },
        { id: 'selection-sort', name: 'Selection Sort', icon: 'checkmark-done-outline' },
      ]
    },
    'searching': {
      title: 'Algoritmos de Busca',
      description: 'Algoritmos para encontrar um elemento dentro de uma estrutura de dados.',
      icon: 'search',
      algorithms: [
        { id: 'binary-search', name: 'Binary Search', icon: 'git-branch-outline' },
        { id: 'linear-search', name: 'Linear Search', icon: 'scan-outline' },
        { id: 'depth-first-search', name: 'Depth First Search', icon: 'layers-outline' },
        { id: 'breadth-first-search', name: 'Breadth First Search', icon: 'expand-outline' },
      ]
    },
    'graph': {
      title: 'Algoritmos de Grafos',
      description: 'Algoritmos que processam estruturas de dados de grafos.',
      icon: 'git-network',
      algorithms: [
        { id: 'dijkstra', name: 'Algoritmo de Dijkstra', icon: 'map-outline' },
        { id: 'kruskal', name: 'Algoritmo de Kruskal', icon: 'git-merge-outline' },
      ]
    },
    'network': {
      title: 'Fluxo de Rede',
      description: 'Algoritmos para otimização de fluxo em redes.',
      icon: 'cloud-outline',
      algorithms: [
        { id: 'ford-fulkerson', name: 'Ford-Fulkerson', icon: 'swap-horizontal-outline' },
      ]
    },
    'string': {
      title: 'Processamento de Strings',
      description: 'Algoritmos para manipulação e análise de strings.',
      icon: 'text-outline',
      algorithms: [
        { id: 'kmp', name: 'Knuth-Morris-Pratt', icon: 'code-outline' },
        { id: 'rabin-karp', name: 'Rabin-Karp', icon: 'barcode-outline' },
      ]
    },
    'math': {
      title: 'Algoritmos Matemáticos',
      description: 'Algoritmos para resolver problemas matemáticos e numéricos.',
      icon: 'calculator-outline',
      algorithms: [
        { id: 'euclidean', name: 'Algoritmo de Euclides', icon: 'analytics-outline' },
        { id: 'sieve', name: 'Crivo de Eratóstenes', icon: 'grid-outline' },
      ]
    },
    'compression': {
      title: 'Compressão de Dados',
      description: 'Algoritmos para reduzir o tamanho de dados.',
      icon: 'archive-outline',
      algorithms: [
        { id: 'huffman', name: 'Codificação de Huffman', icon: 'document-outline' },
      ]
    },
    'crypto': {
      title: 'Algoritmos Criptográficos',
      description: 'Algoritmos para criptografia e segurança de dados.',
      icon: 'lock-closed-outline',
      algorithms: [
        { id: 'rsa', name: 'RSA', icon: 'key-outline' },
        { id: 'aes', name: 'AES', icon: 'shield-outline' },
      ]
    },
    'ml': {
      title: 'Machine Learning',
      description: 'Algoritmos de aprendizado de máquina.',
      icon: 'bulb-outline',
      algorithms: [
        { id: 'k-means', name: 'K-Means', icon: 'stats-chart-outline' },
        { id: 'knn', name: 'K-Nearest Neighbors', icon: 'people-outline' },
      ]
    }
}