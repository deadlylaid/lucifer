from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from game.characters.models import Character


class GameSaveAPIView(APIView):

    def put(self, request):
        level = self.request.data.get('level')
        gold = self.request.data.get('gold')
        strong = self.request.data.get('strong')
        experience = self.request.data.get('experience')
        attack_point = self.request.data.get('attack_point')
        defence_point = self.request.data.get('defence_point')
        nickname = self.request.data.get('nickname')
        health = self.request.data.get('health')
        maxHealth = self.request.data.get('maxHealth')
        dexterity = self.request.data.get('dexterity')
        intelligence = self.request.data.get('intelligence')
        first_skill_damage = self.request.data.get('firstSkillDamage')
        second_skill_damage = self.request.data.get('secondSkillDamage')
        third_skill_damage = self.request.data.get('thirdkillDamage')
        fourth_skill_damage = self.request.data.get('fourthSkillDamage')
        fifth_skill_damage = self.request.data.get('fifthSkillDamage')

        character = Character.objects.get(nickname=nickname)

        character.level = level
        character.gold = gold

        character.save()

        character.status.strong = strong
        character.status.max_health = maxHealth
        character.status.health = health
        character.status.dexterity = dexterity
        character.status.intelligence = intelligence

        character.status.attack_point = round(float(attack_point))
        character.status.defence_point = round(float(defence_point))
        character.status.experience = experience

        character.status.save()

        skills = character.learnedskill_set.all()
        skills[0].damage = first_skill_damage
        skills[1].damage = second_skill_damage
        skills[2].damage = third_skill_damage
        skills[3].damage = fourth_skill_damage
        skills[4].damage = fifth_skill_damage
        skills[0].save()
        skills[1].save()
        skills[2].save()
        skills[3].save()
        skills[4].save()

        return Response(status=status.HTTP_200_OK)
