---
order: 2
title: Претрага
---

# Претрага

In Zammad, you can search for all available information like:

- Предмет и садржај поруке
- Имена и имејл адресе
- Текст у датотекама прилога
- User and organization details (like notes, names, etc.)

У зависности од тога шта тражите и количине података у вашој Zammad
инстанци, можете претраживати на различите начине. Прочитајте даље да
сазнате основе претраге, затим детаљну претрагу и коришћење Elasticsearch
синтаксе.

## Преко претраге

The search is located in the top left corner of the primary
navigation. Either select it via mouse or use the keyboard shortcut
[[s]]. After activation, you can see the tickets that were recently closed
from your taskbar as well as your recent search queries. To search, simply
type a term. The search then displays all matching items for which you have
at least view or read permissions, grouped by type like users and
tickets. Selecting one of those results opens the item as tab in the
taskbar.

Searching for a term also matches any values that begin with it. For
example, searching for `brooks` also finds values like `brookster`. This
does not apply when you use an attribute notation like
`owner.lastname:brooks` (described in the [Elasticsearch
syntax](#using-elasticsearch-syntax) section below), which matches exact
values only.

![Screenshot shows search results in the
taskbar](/screenshots/cypress/documentation/use/guide-search.cy.js/search-sidebar.png)

If you press [[enter]] or click on `detailed search`, Zammad opens the
detailed search as a tab in the taskbar. There you can narrow down your
search by selecting a specific object type (e.g. organization), using
advanced filters or even using Elasticsearch syntax. Read on for more
information.

## Следећи кораци

Понекад једноставан термин за претрагу можда неће дати резултате које
тражите. Zammad пружа различите опције за сужавање претраге на страници
детаљне претраге.

Advanced filters are not available for customer accounts. If your account
has customer permissions only, the **Search entity** selector and the
advanced filter options described below are not shown.

![Пример снимка екрана (пуна
страна)](/screenshots/cypress/documentation/use/guide-search.cy.js/search-detail.png)

### Орденар лос ресултадос

Пара орденар лос ресултадос сегúн лос валорес де ла цолумна, хаз цлиц ен ел
енцабезадо де уна цолумна. Ел орден се индица цон уна флецха. Хаз цлиц ен ла
цолумна нуеваменте пара цамбиар ел орден де асценденте а десценденте y
вицеверса.

### Лимитар бúsqueda ал типо де објето

Лимита ла бúsqueda а ун типо де објето утилизандо ел селецтор де пестаñас
**Бусцар ентидад** дебајо дел цампо де бúsqueda (п. еј., усуарио о
тицкет). Есто лимита ла бúsqueda ал типо де објето селецционадо y а сус
датос релационадос. Пор ејемпло, цуандо селецционас **Ticket**, ла бúsqueda
тамбиéн девуелве тицкетс донде ел пропиетарио о ел цлиенте цоинциден цон ел
тéрмино де бúsqueda.

### Напредне функције

Unlike the search field, you can filter the search results based on specific
attributes and their values.  To do so, click on the `Advanced filters`
button on the right side, which opens an area where you can specify
additional conditions based on specific attributes and their values. Choose
an attribute and enter or select a value to match against. When using more
than one filter, all conditions must be met; they are logically connected by
AND. This also applies to the search term in the main search field.

Remove a single filter by hovering over it and clicking the ::x:: that
appears next to the value field. To remove all filters, click the `x` in the
main search bar at the top next to the `x filter(s)` label and confirm the
removal.

To add another filter, click `Add filter` below or between the existing
filter rows and pick an attribute from the selection list. The list only
offers attributes that are not used by any filter yet, so each attribute can
be used only once.

Си десеас гуардар о цомпартир ту филтро, пуедес хацерло цопиандо ла
URL. Incluye ел филтро цомплето. Тен ен цуента que лос ресултадос де
бúsqueda пуеден сер диферентес пара отрос усуариос дебидо а пермисос
дистинтос.

Уколико не можете да пронађете жељене информације, пробајте да започенете
претрагу из заглавља стране.

## Elasticsearch

This is an advanced topic for power users. By using Elasticsearch syntax,
you can exactly filter your data for specific attribute values. All indexed
attributes are supported. Read on to find examples of how to use it or head
over to the [indexed attributes by Elasticsearch
page](/en/reference/es-indexed-attributes) where you can find a list with
additional attributes.

### Важне информације

- Асегúрате де селецционар ел објето релеванте ен ел цамбиадор **Бусцар
  ентидад**. Пор ејемпло, `customer.lastname` естá диспонибле пара тицкетс,
  перо но пара усуариос.
- Multiple search terms are combined by a logical AND by default, so `smith
  open` only finds results containing both terms. Use an explicit `OR` if
  you want either of them.
- Ал цомбинар уна цонсулта де Elasticsearch цон филтрос аванзадос, тен ен
  цуента que тодас лас цондиционес дел филтро аванзадо y ла sintaxis де
  бúsqueda естáн цонецтадас лóгицаменте пор AND, пор ло que соло се
  мострарáн лос ресултадос que цоинцидан цон тодас лас цондиционес дел
  филтро аванзадо y ту тéрмино де бúsqueda.
- Пара пропорционар валорес que цонтенган ун еспацио, енциéрралос ен `"`,
  п. еј., `priority.name:"2 normal"`.

### Операдорес лóгицос y рангос

Пуедес цомбинар цондиционес утилизандо `AND` y `OR` цомо операдорес
лóгицос. Уса `TO` пара еспецифицар рангос пара валорес цон орден (п. еј.,
ентерос о фецхас). Incluye ун лíмите дел ранго еспецифицадо усандо
цорцхетес. Exclúyelo усандо ллавес. Инцлусо пуедес цомбинар естос цорцхетес,
п. еј., пара инцлуир ел лíмите инфериор y excluir ел супериор. Лос тéрминос
анидадос се пуеден лограр сепарáндолос цон парéнтесис `()`.

`AND` y `OR` цон парéнтесис:

```plain
owner.lastname:brooks AND tags:(internal OR onboarding)
```

`TO` цон цомодíн де астерисцо:

```plain
state.name:open AND article_count: [5 TO *]
```

`TO` excluyendo ун лíмите де ун ранго:

```plain
article.created_at:[2025-03-21 TO 2026-05-19}
```

### Претрага

Си но естáс сегуро де ла ортографíа exacta де ун валор, утилиза ла тилде
(`~`) цомо суфијо пара реализар уна бúsqueda дифуса (fuzzy).

```plain
owner.firstname:lawren~
```

### Навигациона трака

Си десеас excluir валорес еспецíфицос, пуедес усар ла негациóн `!`. Пара
негар мáс де ун тéрмино, уса парéнтесис пара тодос еллос.

Excluir пропиетарио цон апеллидо "броокс":

```plain
!owner.lastname:brooks
```

Excluir мúлтиплес цондиционес:

```plain
owner.lastname:brooks AND !(tags:internal OR tags:onboarding)
```

### Регуларни израз

Инцлусо пуедес усар regex пара бусцар. Енциерра ел тéрмино де ла regex ен
`/`.

```plain
customer.lastname:/(bra?.n|doe)/
```
