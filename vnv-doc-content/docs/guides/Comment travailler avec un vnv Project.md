Un project DUMP provient dirrectement de la base de donnée et continent tout les données d'un projet vnv en JSON
Un vpi est un 'Virtual project interface', sella signifie que c'est un expression virtuel d'un projet, "interfacé" dans un client permettant d'intéragire avec lui.

 ## Project DUMP et VPI, quel différence ?
 
 - Un project DUMP est en JSON, ce qui signifie qu'il faut faire des manipulations dans l'objet pour interagir avec le project.
 - Un VPI se contruit sur un DUMP et permet d'intéragir avec celui-ci de manière unifié et globale. Si un élément se crée et qu'il implque une création d'un lien, celui-ci est automatiquement prévu par le VPI pemettant de diminuer les interactions et de les simpléfié.
 
Le VPI permet aussi de rechercher, d'ajouter, mettre à jour ou supprimer des datas. Il utilise un système de calcul diff entre les opérations qui s'exécute dans le VPI permettant une gestion de l'historiques des modifications ainsi qu'un système posible de undo - redo.

Ce sont ces diffs qui sont utilisé pour appliquer les changements faits dans un VPI avec le projet stocké dans la base de donnée.

## Utilisation d'un VPI

Le vpi s'instancie avec le package `VPI` de `vn-sdk`.

 ```typescript
import * as vnv from '@infrasoftbe/vnv-sdk';

const JSONDump = ...;

const vpi = vnv.VPI.ProjectInstance.init( JSONDump );
 ```

C'est tout.

## Types de datas contenue dans le DUMP

Le dump est un objet clée valeurs contenant quelques `fields`.
 - `self` : Contenant les informations du projet lui même en plus des métadonnées du projet
 - `data.nodes`: Contenant les nodes du projet
 - `data.relations`: Contenant les relations entre les nodes du projet
 - `data.metas`: Contenant les metadatas des nodes / structures / lists
 - `data.structures`: Contenant les Structures du projet
 - `data.lists`: Contenant les Lists du projet
## Types de datas contenue dans le VPI

Le vpi continent les même jeux de donnée que le JSONDump à ce-ci prêt qu'il ajoute des utilitaire permettant de facilité es interactions et modifie légèrement certains types de données comme les tableaux au profis de Map, permettant de faire des accession plutôt que des recherches sur les jeux de données.

## Fonctionnalité d'un VPI

Un VPI permet :
- Calcul unifié de token
- Validation d'un token

- `vpi.emit()`:
- `vpi.on()`:
- `vpi.addNode()`:
- `vpi.setNode()`:
- `vpi.hasNode()`:
- `vpi.deleteNode()`:
- `vpi.getNodeByToken()`:
- `vpi.queryNodeAll()`:
- `vpi.addRelation()`:
- `vpi.setRelation()`:
- `vpi.hasRelation()`:
- `vpi.deleteRelation()`:
- `vpi.getRelationByToken()`:
- `vpi.queryRelationAll()`:
- `vpi.addMetadata()`:
- `vpi.setMetadata()`:
- `vpi.hasMetadata()`:
- `vpi.deleteMetadata()`:
- `vpi.getMetadataByToken()`:
- `vpi.queryMetadataAll()`:
- `vpi.addStructure()`:
- `vpi.setStructure()`:
- `vpi.hasStructure()`:
- `vpi.deleteStructure()`:
- `vpi.getStructureByToken()`:
- `vpi.queryStructureAll()`:
- `vpi.addList()`:
- `vpi.setList()`:
- `vpi.hasList()`:
- `vpi.deleteList()`:
- `vpi.getListBytoken()`:
- `vpi.queryListAll()`:
- `vpi.getNodesByType()`:
- `vpi.getRelationFromNodeToken()`:
- `vpi.getRelationToToken()`:
- `vpi.nodeTypeList`: Retourne une tableau de nodes possible dans le projet
- `vpi.relationTypeList`: Retourne un tableau de liens possible dans le projet
- `vpi.projectToken`: Token du projet contenu dans le champ `self.token`.
- `vpi.json`: Expression en json du VPI
- `vpi.findNodeByToken`: Permet de rechercher nu noeud par son token dans les `nodes` | `lists` | `structures` | `childs` du projet.
- `vpi.ensureInstance`:
- `vpi.createAvailableToken`:
- `vpi.isAvailableToken`:

### Fonctionnalité d'un noeud

Un noeud a seins d'un VPI n'est pas juste un objet, mais une instance d'une `classe node`, ce qui signifie qu'il a lui aussi des utilitaires permettant d'intéragire en tant que node dans le projet.

- `node.getMetadata()`:
- `node.setMetadata()`:
- `node.inRelationships`:
- `node.outRelationships`:
- `node.fromRelationships`:
- `node.forRelationships`:
- `node.inNodes`:
- `node.outNodes`:
- `node.fromNodes`:
- `node.update()`:
- `node.delete()`:
- `node.linkTo()`:
- `node.linkFor()`:
- `node.flat`:
- `node.schema`:
### Fonctionnalité d'une Structure

Un structure au seins d'un VPI est aussi une instance `class node` mais qui a été extends par `class structure` ce qu'il s'ignifie que la structure possède les mêmes utilitaires que le node en plus d'ajouter :
- `structure.addNode()`:
- `structure.setNode()`:
- `structure.hasNode()`:
- `structure.deleteNode()`:
- `structure.queryNodeAll()`:
- `structure.getChildByToken()`
- `structure.isConsistant()`:
- `structure.isComplete()`:
- `structure.isCorrect()`:
- `structure.nestedv1()`:
- `structure.nestedv2()`:
- `structure.flatv1()`:
- `structure.flatv2()`:

### Fonctionnalité d'une List

Une liste au seins d'un VPI est une instance `class list` qui a été extends de `class structure`, ce qui signifie qu'elle possède les même utilitaires que la structure

### CRUD \ Transaction et Opérations

Toute les opérations sont stockée dans `vpi.operations`, une opération est une transaction entre un jeu de donnée et un autre pour un item avec un calcul de différences sur les champs modifiée. Les valeurs sont alors stockée dans une `clé` : `[oldValue,newValue]` permettant de garder un trace du champ modifié.

Un opération se structure ainsi : 
- `operation._id`: Id interne de l'opération
- `operation.eventTime`: Event Time interne de l'opération
- `operation.method`: Méthode CRUD associé à l'opération
- `operation.data`: Data de l'opération
- `operation.operationtype`: Type d'item associé à l'opération
- `operation.operationId`: Id idempotant de l'opération, petmettant d'assurer l'unicité d'une opération dans le temps.
- `operation.ref`: Référence interne à l'item modifié par l'opération
- `operation.delta`: Delta de la modification. 